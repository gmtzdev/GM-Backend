import * as moment from 'moment';

import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

import { Bill } from 'src/finances/bill/entities/bill.entity';

import { MonthOfYear } from '../../shared/enums/MonthOfYear.enum'
import { InformationOfGraphic } from 'src/shared/models/InformationOfGraphic.model';
import { IncomesVsBill } from 'src/shared/models/IncomesVsBill.model';
import { Income } from 'src/finances/income/entities/income.entity';

@Injectable()
export class GeneralService {

  













  // create(createGeneralDto: CreateGeneralDto) {
  //   return 'This action adds a new general';
  // }

  // findAll() {
  //   return `This action returns all general`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} general`;
  // }

  // update(id: number, updateGeneralDto: UpdateGeneralDto) {
  //   return `This action updates a #${id} general`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} general`;
  // }
}
