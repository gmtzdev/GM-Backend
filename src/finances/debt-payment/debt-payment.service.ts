import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateDebtPaymentDto } from './dto/create-debt-payment.dto';
import { UpdateDebtPaymentDto } from './dto/update-debt-payment.dto';
import { Repository } from 'typeorm';
import { DebtPayment } from './entities/debt-payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DebtService } from '../debt/debt.service';
import { HttpResponse } from 'src/core/models/http/HttpResponse.model';

@Injectable()
export class DebtPaymentService {
  constructor(
    @InjectRepository(DebtPayment, 'finance')
    private readonly debtPaymentRepository: Repository<DebtPayment>,
    private readonly debtService: DebtService,
  ) {}

  public async createDebtPayment(createDebtPaymentDto: CreateDebtPaymentDto) {
    const debt = await this.debtService.findOne(createDebtPaymentDto.debt);
    if (!debt) {
      throw new Error('Debt not found!!');
    }
    const newDebtPayment =
      this.debtPaymentRepository.create(createDebtPaymentDto);
    const debtPayment = await this.debtPaymentRepository.save(newDebtPayment);

    if (!(debtPayment instanceof DebtPayment)) {
      throw new Error('Error creating debt payment');
    }

    await this.debtService.calculatePercentage(debt);

    return debtPayment;
  }

  public async create(createDebtPaymentDto: CreateDebtPaymentDto) {
    const debt = await this.debtService.findOne(createDebtPaymentDto.debt);
    if (!debt) {
      throw new Error('Debt not found!!');
    }
    const newDebtPayment =
      this.debtPaymentRepository.create(createDebtPaymentDto);
    const debtPayment = await this.debtPaymentRepository.save(newDebtPayment);

    if (!(debtPayment instanceof DebtPayment)) {
      throw new Error('Error creating debt payment');
    }

    await this.debtService.calculatePercentage(debt);

    return new HttpResponse(
      true,
      `Debt payment create successflly!!`,
      debtPayment,
      HttpStatus.CREATED,
    );
  }

  public async findAll() {
    const debtPayments = await this.debtPaymentRepository.find();
    return new HttpResponse(true, `Debt payments were fonud!!`, debtPayments);
  }

  findOne(id: number) {
    return `This action returns a #${id} debtPayment`;
  }

  update(id: number, updateDebtPaymentDto: UpdateDebtPaymentDto) {
    // TODO implements this method
    console.log(updateDebtPaymentDto);
    return `This action updates a #${id} debtPayment`;
  }

  remove(id: number) {
    return `This action removes a #${id} debtPayment`;
  }
}
