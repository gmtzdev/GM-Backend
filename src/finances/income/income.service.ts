import { Injectable } from '@nestjs/common';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Income } from './entities/income.entity';
import { HttpResponse } from 'src/core/models/http/HttpResponse.model';

@Injectable()
export class IncomeService {
  constructor(
    @InjectRepository(Income, 'finance')
    private incomeRepository: Repository<Income>,
  ) {}

  async create(createIncomeDto: CreateIncomeDto) {
    const newIncome = this.incomeRepository.create(createIncomeDto);
    const income = await this.incomeRepository.save(newIncome);
    if (!(income instanceof Income)) {
      // Error
    }
    return new HttpResponse(true, 'Income created successfully', income);
  }

  findAll() {
    return this.incomeRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} income`;
  }

  update(id: number, updateIncomeDto: UpdateIncomeDto) {
    console.log(updateIncomeDto);
    return `This action updates a #${id} income`;
  }

  remove(id: number) {
    return `This action removes a #${id} income`;
  }
}
