import * as moment from 'moment';
import { from, pipe, groupBy, mergeMap, toArray } from 'rxjs';

import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

// Entity
import { Income } from 'src/finances/income/entities/income.entity';
import { Bill } from 'src/finances/bill/entities/bill.entity';

// Enum
import { MonthOfYear } from 'src/shared/enums/MonthOfYear.enum';

// Model
import { IncomesVsBill } from 'src/shared/models/IncomesVsBill.model';
import { InformationOfGraphic } from 'src/shared/models/InformationOfGraphic.model';
import { HttpResponse } from 'src/shared/models/HttpResponse.model';

@Injectable()
export class FinancesService {

  constructor(
    @InjectRepository(Income, 'finance')
    private incomeRepository: Repository<Income>,
    @InjectRepository(Bill, 'finance')
    private billRepository: Repository<Bill>
  ) { }

  async getIncomesPer(date: string) {
    try {

      const firstDayOfYear = moment(date).startOf('year').format('YYYY-MM-DD HH:mm:ss.SSS');
      const lastDayOfYear = moment(date).endOf('year').format('YYYY-MM-DD HH:mm:ss.SSS');

      const firstDayOfMonth = moment(date).startOf('month').format('YYYY-MM-DD HH:mm:ss.SSS');
      const lastDayOfMonth = moment(date).endOf('month').format('YYYY-MM-DD HH:mm:ss.SSS');

      const firstHourOfDay = moment(date).startOf('day').format('YYYY-MM-DD HH:mm:ss.SSS');
      const lastHourOfDay = moment(date).endOf('day').format('YYYY-MM-DD HH:mm:ss.SSS');

      const incomesPerYear = await this.incomeRepository.findBy({
        created_at: Between(new Date(firstDayOfYear), new Date(lastDayOfYear))
      });

      const incomesPerMonth = await this.incomeRepository.findBy({
        created_at: Between(new Date(firstDayOfMonth), new Date(lastDayOfMonth))
      });

      const incomesPerDay = await this.incomeRepository.findBy({
        created_at: Between(new Date(firstHourOfDay), new Date(lastHourOfDay))
      });

      let amountPerYear: number = 0;
      incomesPerYear.forEach((income) => {
        amountPerYear += income.amount;
      });

      let amountPerMonth: number = 0;
      incomesPerMonth.forEach((income) => {
        amountPerMonth += income.amount;
      });

      let amountPerDay: number = 0;
      incomesPerDay.forEach((income) => {
        amountPerDay += income.amount;
      });

      const incomesPer = [amountPerYear, amountPerMonth, amountPerDay];
      return new HttpResponse(true, 'Return incomes', { incomesPer })
    } catch (error) {
      return new HttpResponse(false, 'Error into getIncomesPer', { error: error.message }, 400)
    }
  }

  async getBillsPer(date: string) {
    try {

      const firstDayOfYear = moment(date).startOf('year').format('YYYY-MM-DD HH:mm:ss.SSS');
      const lastDayOfYear = moment(date).endOf('year').format('YYYY-MM-DD HH:mm:ss.SSS');

      const firstDayOfMonth = moment(date).startOf('month').format('YYYY-MM-DD HH:mm:ss.SSS');
      const lastDayOfMonth = moment(date).endOf('month').format('YYYY-MM-DD HH:mm:ss.SSS');

      const firstHourOfDay = moment(date).startOf('day').format('YYYY-MM-DD HH:mm:ss.SSS');
      const lastHourOfDay = moment(date).endOf('day').format('YYYY-MM-DD HH:mm:ss.SSS');

      const billsPerYear = await this.billRepository.findBy({
        created_at: Between(new Date(firstDayOfYear), new Date(lastDayOfYear))
      });

      const billsPerMonth = await this.billRepository.findBy({
        created_at: Between(new Date(firstDayOfMonth), new Date(lastDayOfMonth))
      });

      const billsPerDay = await this.billRepository.findBy({
        created_at: Between(new Date(firstHourOfDay), new Date(lastHourOfDay))
      });

      let amountPerYear: number = 0;
      billsPerYear.forEach((bill) => {
        amountPerYear += bill.amount;
      });

      let amountPerMonth: number = 0;
      billsPerMonth.forEach((bill) => {
        amountPerMonth += bill.amount;
      });

      let amountPerDay: number = 0;
      billsPerDay.forEach((bill) => {
        amountPerDay += bill.amount;
      });

      const billsPer = [amountPerYear, amountPerMonth, amountPerDay];
      return new HttpResponse(true, 'Return bills', { billsPer })
    } catch (error) {
      return new HttpResponse(false, 'Error into getIncomesPer', { error: error.message }, 400)
    }
  }

  async getBillsInFormat() {
    try {
      const bills = await this.billRepository.createQueryBuilder()
        .select('created_at', 'name')
        .addSelect('amount', 'value')
        .execute();

      const billsInFormat = {
        name: 'Bills',
        series: bills
      }

      return new HttpResponse(true, 'Bills find successfully!', { data: billsInFormat });
    } catch (error) {
      return new HttpResponse(false, 'Error into getBillsInFormat', { error: error.message }, 400);
    }
  }

  async getTopOneCategory() {
    try {
      const bills = await this.billRepository.find({ relations: ['category'] });

      const grouped = bills.reduce((previousValue: any, currentValue: any) => {
        (previousValue[currentValue.category['name']] = previousValue[currentValue.category['name']] || []).push(currentValue);
        return previousValue;
      }, {});

      let result = []
      for (let key in grouped) {
        let category = key;
        let amount = 0;
        for (let bill of grouped[category] as Bill[]) {
          amount += bill.amount;
        }
        result.push({ category, amount });
      }
      
      result.sort((a, b) => a.amount - b.amount);
      

      return new HttpResponse(true, 'Top One Category find successfully!', result.pop());
    } catch (error) {
      return new HttpResponse(false, error.message, { error: error.message }, 400);
    }
  }

  async getIncomesVsBills(year: number) {

    let incomesVsBill: IncomesVsBill[] = [];

    for (let month in MonthOfYear) {
      let ivb: IncomesVsBill = new IncomesVsBill(month, []);

      let first = moment(`${year}-${MonthOfYear[month]}-15`).startOf('month').format('YYYY-MM-DD HH:mm:ss.SSS');
      let last = moment(`${year}-${MonthOfYear[month]}-15`).endOf('month').format('YYYY-MM-DD HH:mm:ss.SSS');


      const incomeOfMonth = await this.incomeRepository.findBy({
        created_at: Between(new Date(first), new Date(last))
      });
      let countIncome: number = 0.0;
      for (let income of incomeOfMonth) {
        countIncome += income.amount;
      }


      const billsOfMonth = await this.billRepository.findBy({
        created_at: Between(new Date(first), new Date(last))
      })
      let countBill: number = 0.0;
      for (let bill of billsOfMonth) {
        countBill += bill.amount;
      }

      let infoIncomes: InformationOfGraphic = new InformationOfGraphic("Incomes", parseFloat(countIncome.toFixed(2)));
      let infoBills: InformationOfGraphic = new InformationOfGraphic("Bills", parseFloat(countBill.toFixed(2)));

      ivb.series.push(infoIncomes);
      ivb.series.push(infoBills);

      incomesVsBill.push(ivb);
    }

    return incomesVsBill;
  }










  // create(createFinanceDto: CreateFinanceDto) {
  //   return 'This action adds a new finance';
  // }

  // findAll() {
  //   return `This action returns all finances`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} finance`;
  // }

  // update(id: number, updateFinanceDto: UpdateFinanceDto) {
  //   return `This action updates a #${id} finance`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} finance`;
  // }
}
