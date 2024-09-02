import { Injectable } from '@nestjs/common';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Debt } from './entities/debt.entity';
import { Repository } from 'typeorm';
import { DebtPayment } from '../debt-payment/entities/debt-payment.entity';

@Injectable()
export class DebtService {
  constructor(
    @InjectRepository(Debt, 'finance')
    private readonly debtRepository: Repository<Debt>,
  ) {}

  async create(createDebtDto: CreateDebtDto) {
    const newDebt = this.debtRepository.create(createDebtDto);
    const debt = await this.debtRepository.save(newDebt);
    if (!(debt instanceof Debt)) {
      throw new Error('Debt has not created');
    }
    return debt;
  }

  async findAll() {
    const debts: Debt[] = await this.debtRepository.find({
      relations: { debtPayments: true },
    });
    return debts;
  }

  // Method signatures
  async findOne(id: number): Promise<Debt>;
  async findOne(debt: Debt): Promise<Debt>;
  async findOne(data: number | Debt): Promise<Debt> {
    if (typeof data === 'number') {
      const debt: Debt = await this.debtRepository.findOneBy({ id: data });
      return debt;
    }
    const debt: Debt = await this.debtRepository.findOneBy(data);
    return debt;
  }

  update(id: number, updateDebtDto: UpdateDebtDto) {
    console.log(updateDebtDto);
    return `This action updates a #${id} debt`;
  }

  remove(id: number) {
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

  async calculatePercentage(id: number): Promise<boolean>;
  async calculatePercentage(debt: Debt): Promise<boolean>;
  async calculatePercentage(data: number | Debt): Promise<boolean | Error> {
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
      { percentage: percentage },
    );

    if (updated.affected !== 1) {
      throw new Error('Error updating debt');
    }

    this.isCompleted(debt, c);

    return true;
  }

  public test(debt: Debt): string {
    console.log(debt);
    return 'Hello World';
  }
}
