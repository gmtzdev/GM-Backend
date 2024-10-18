import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PayCreditCard } from './entities/pay-credit-card.entity';
import { Repository } from 'typeorm';
import { HttpResponse } from 'src/core/models/http/HttpResponse.model';

@Injectable()
export class PayCreditCardService {
  constructor(
    @InjectRepository(PayCreditCard, 'finance')
    private readonly paycreditcardRepository: Repository<PayCreditCard>,
  ) {}

  /**
   * Return the current period of the credit card
   *
   * @returns {Promise<PayCreditCard>}
   */
  public async getLastRegister(): Promise<PayCreditCard> {
    const result = await this.paycreditcardRepository.find({
      order: { id: 'DESC' },
      take: 1,
    });
    if (result.length !== 1) {
      throw new HttpException(
        'Error searching last register',
        HttpStatus.BAD_REQUEST,
      );
    }
    const payCreditCard = result[0];
    if (!(payCreditCard instanceof PayCreditCard)) {
      throw new HttpException(
        'Current date pay credit card was not found!!',
        HttpStatus.NOT_FOUND,
      );
    }
    return payCreditCard;
  }

  /**
   *  Add N number of days (days) to a date. Returns a new date.
   *
   * @param {Date} date - The date reference
   * @param {number} days - Number of the days to add
   * @returns {Date}
   */
  private addDays(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }

  public async createNextDate() {
    const lastPayCreditCard = await this.getLastRegister();
    const lastPayDate = lastPayCreditCard.payDate;

    console.log(lastPayDate);
    console.log(this.addDays(lastPayDate, 30));

    return new HttpResponse(
      true,
      `Pay Credit Card creted successfully`,
      lastPayCreditCard,
    );
  }

  public async getCurrentDatePayCreditCard() {
    const result = await this.getLastRegister();
    return new HttpResponse(
      true,
      'Return current date pay credit card',
      result,
    );
  }

  /**
   * Return number of days to pay credit card
   *
   * @returns {Promise<HttpResponse>}
   */
  public async getDaysToPayCreditCard(): Promise<HttpResponse> {
    const currentDateToPay = await this.getLastRegister();
    const today = new Date();
    const timeDifference = currentDateToPay.payDate.getTime() - today.getTime();
    const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return new HttpResponse(
      true,
      `Return the remaining days to  pay the credit card.`,
      dayDifference,
    );
  }
}
