import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { HttpResponse } from 'src/core/models/http/HttpResponse.model';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment, 'finance')
    private paymentRepository: Repository<Payment>,
  ) {}

  create(createPaymentDto: CreatePaymentDto) {
    const newPayment = this.paymentRepository.create(createPaymentDto);
    return this.paymentRepository.save(newPayment);
  }

  async findAll() {
    const payments = await this.paymentRepository.find();
    return new HttpResponse(true, 'Payments were found!!', payments);
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    // TODO implements this service
    console.log(updatePaymentDto);
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
