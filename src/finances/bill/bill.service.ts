import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bill } from './entities/bill.entity';
import { HttpResponse } from 'src/core/models/http/HttpResponse.model';
import { DebtPaymentService } from '../debt-payment/debt-payment.service';

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(Bill, 'finance')
    private readonly billRepository: Repository<Bill>,
    private readonly debtPaymentService: DebtPaymentService,
  ) {}

  async create(createBillDto: CreateBillDto) {
    const newBill = this.billRepository.create(createBillDto);

    const bill = await this.billRepository.save(newBill);
    if (!(bill instanceof Bill)) {
      throw new HttpException('Bill not created', HttpStatus.BAD_REQUEST);
    }

    if (createBillDto.debt) {
      // Create a Debt Payment
      await this.debtPaymentService.createDebtPayment({
        amount: bill.amount,
        message: bill.concept,
        debt: createBillDto.debt,
      });
    }
    return new HttpResponse(true, 'Bill created successfully', bill);
  }

  async findAll() {
    const bills = await this.billRepository.find();
    return new HttpResponse(true, 'Bills were found!', bills);
  }

  async findOne(id: number) {
    const bill = await this.billRepository.findOne({
      where: { id },
      relations: {
        institution: true,
        payment: true,
        card: true,
        category: true,
      },
    });

    if (!bill) {
      throw new HttpException(
        `The bill with id: ${id} was not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return new HttpResponse(true, 'The bill was found', bill);
  }

  async update(id: number, updateBillDto: UpdateBillDto) {
    const bill = this.billRepository.findOne({ where: { id } });
    if (!bill) {
      throw new HttpException(
        `The bill with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedBill = await this.billRepository.save(updateBillDto);

    return new HttpResponse(true, 'Bill updated successfully', updatedBill);
  }

  remove(id: number) {
    return `This action removes a #${id} bill`;
  }
}
