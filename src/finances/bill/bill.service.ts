import { Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bill } from './entities/bill.entity';
import { HttpResponse } from 'src/shared/models/HttpResponse.model';

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(Bill, 'finance')
    private billRepository: Repository<Bill>
  ) { }

  async create(createBillDto: CreateBillDto) {
    const newBill = this.billRepository.create(createBillDto);
    const bill = await this.billRepository.save(newBill);
    if(!(bill instanceof Bill)){
      // Error
    }
    return new HttpResponse(true, 'Bill created successfully', bill);
  }

  findAll() {
    return this.billRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} bill`;
  }

  update(id: number, updateBillDto: UpdateBillDto) {
    return `This action updates a #${id} bill`;
  }

  remove(id: number) {
    return `This action removes a #${id} bill`;
  }
}
