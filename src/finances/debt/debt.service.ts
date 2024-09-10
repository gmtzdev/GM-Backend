import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Debt } from './entities/debt.entity';
import { Repository } from 'typeorm';
import { DebtPayment } from '../debt-payment/entities/debt-payment.entity';
import { HttpResponse } from 'src/core/models/http/HttpResponse.model';

@Injectable()
export class DebtService {
  constructor(
    @InjectRepository(Debt, 'finance')
    private readonly debtRepository: Repository<Debt>,
  ) {}

  public async create(createDebtDto: CreateDebtDto) {
    const newDebt = this.debtRepository.create(createDebtDto);
    const debt = await this.debtRepository.save(newDebt);
    if (!(debt instanceof Debt)) {
      throw new Error('Debt has not created');
    }
    return debt;
  }

  public async findAll() {
    const debts: Debt[] = await this.debtRepository.find({
      relations: { debtPayments: true },
    });
    return new HttpResponse(true, 'Debts were found!!', debts);
  }

  // Method signatures
  public async findOne(id: number): Promise<Debt>;
  public async findOne(debt: Debt): Promise<Debt>;
  public async findOne(data: number | Debt): Promise<Debt> {
    if (typeof data === 'number') {
      const debt: Debt = await this.debtRepository.findOneBy({ id: data });
      return debt;
    }
    const debt: Debt = await this.debtRepository.findOne({
      where: { id: data.id },
    });
    return debt;
  }

  public async findOneByID(id: number) {
    const debt = await this.findOne(id);
    if (!debt) {
      throw new HttpException(
        `Debt with id: ${id} not found!`,
        HttpStatus.NOT_FOUND,
      );
    }
    return new HttpResponse(true, 'Debt was found!', debt);
  }

  public async update(id: number, updateDebtDto: UpdateDebtDto) {
    const result = await this.debtRepository.update({ id }, updateDebtDto);
    if (result.affected !== 1) {
      throw new HttpException(
        `Some error ocurred updating debt with id: ${id}`,
        HttpStatus.NOT_MODIFIED,
      );
    }
    return new HttpResponse(true, `Update a #${id} debt`, updateDebtDto);
  }

  public remove(id: number) {
    return `This action removes a #${id} debt`;
  }

  private async isCompleted(debt: Debt, amount: number): Promise<void | Error> {
    if (amount >= debt.amount) {
      const completed = await this.debtRepository.update(
        { id: debt.id },
        { complete: true },
      );
      if (completed.affected !== 1) {
        throw new Error('Error updating complete debt');
      }
    }
  }

  public async calculatePercentage(id: number): Promise<boolean>;
  public async calculatePercentage(debt: Debt): Promise<boolean>;
  public async calculatePercentage(
    data: number | Debt,
  ): Promise<boolean | Error> {
    let debt: Debt;
    if (typeof data === 'number')
      debt = await this.debtRepository.findOne({
        where: { id: data },
        relations: { debtPayments: true },
      });
    else if (typeof data === 'object') {
      debt = await this.debtRepository.findOne({
        where: { id: data.id },
        relations: { debtPayments: true },
      });
    } else return false;

    if (!(debt instanceof Debt)) {
      throw new Error('Debt not found!!');
    }

    const debtPayments: DebtPayment[] = debt.debtPayments;
    let c: number = 0;
    debtPayments.forEach((debtPayment) => {
      c += debtPayment.amount;
    });

    const percentage: number = (c * 100) / debt.amount;

    const updated = await this.debtRepository.update(
      { id: debt.id },
      { percentage: percentage, paid: c },
    );

    if (updated.affected !== 1) {
      throw new Error('Error updating debt');
    }

    this.isCompleted(debt, c);

    return true;
  }

  public async getNoCompleteDebts() {
    const noCompleteDebts = await this.debtRepository.find({
      where: { complete: false },
      relations: { debtPayments: true },
    });
    for (const debt of noCompleteDebts) {
      let paid: number = 0;
      for (const debtPayment of debt.debtPayments) {
        paid += debtPayment.amount;
      }
      debt.paid = paid;
    }
    return new HttpResponse(
      true,
      'No complete objectives were successfully found!!',
      noCompleteDebts,
    );
  }

  public async test(debt: Debt): Promise<HttpResponse> {
    const calculated = await this.calculatePercentage(debt.id);
    return new HttpResponse(true, 'Hello World', calculated);
  }
}
