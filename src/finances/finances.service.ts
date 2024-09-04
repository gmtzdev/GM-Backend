import * as moment from 'moment';
import { HttpStatus, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

// Entity
import { Income } from 'src/finances/income/entities/income.entity';
import { Bill } from 'src/finances/bill/entities/bill.entity';
import { Objective } from 'src/finances/objective/entities/objective.entity';
import { Category } from 'src/finances/category/entities/category.entity';

// Enum
import { MonthOfYear } from 'src/shared/enums/MonthOfYear.enum';

// Intefaces
import { CategoryOptions } from 'src/shared/interfaces/categoryOptions';

// Model
import { IncomesVsBill } from 'src/shared/models/IncomesVsBill.model';
import { InformationOfGraphic } from 'src/shared/models/InformationOfGraphic.model';
import { HttpResponse } from 'src/shared/models/HttpResponse.model';

// Services
import { MoneyService } from 'src/shared/services/money.service';
import { CategoryGraphic } from 'src/shared/models/categoryGraphic';

@Injectable()
export class FinancesService {
  constructor(
    @InjectRepository(Income, 'finance')
    private incomeRepository: Repository<Income>,
    @InjectRepository(Bill, 'finance')
    private billRepository: Repository<Bill>,
    @InjectRepository(Objective, 'finance')
    private objectiveRepository: Repository<Objective>,
    @InjectRepository(Category, 'finance')
    private categoryRepository: Repository<Category>,
    private moneyService: MoneyService,
  ) {}

  async getIncomesPer(date: string) {
    try {
      const firstDayOfYear = moment(date)
        .startOf('year')
        .format('YYYY-MM-DD HH:mm:ss.SSS');
      const lastDayOfYear = moment(date)
        .endOf('year')
        .format('YYYY-MM-DD HH:mm:ss.SSS');

      const firstDayOfMonth = moment(date)
        .startOf('month')
        .format('YYYY-MM-DD HH:mm:ss.SSS');
      const lastDayOfMonth = moment(date)
        .endOf('month')
        .format('YYYY-MM-DD HH:mm:ss.SSS');

      const firstHourOfDay = moment(date)
        .startOf('day')
        .format('YYYY-MM-DD HH:mm:ss.SSS');
      const lastHourOfDay = moment(date)
        .endOf('day')
        .format('YYYY-MM-DD HH:mm:ss.SSS');

      const incomesPerYear = await this.incomeRepository.findBy({
        created_at: Between(new Date(firstDayOfYear), new Date(lastDayOfYear)),
      });

      const incomesPerMonth = await this.incomeRepository.findBy({
        created_at: Between(
          new Date(firstDayOfMonth),
          new Date(lastDayOfMonth),
        ),
      });

      const incomesPerDay = await this.incomeRepository.findBy({
        created_at: Between(new Date(firstHourOfDay), new Date(lastHourOfDay)),
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

      const incomesPer = [
        this.moneyService.toFixed(amountPerYear),
        this.moneyService.toFixed(amountPerMonth),
        this.moneyService.toFixed(amountPerDay),
      ];
      return new HttpResponse(true, 'Return incomes', { incomesPer });
    } catch (error) {
      return new HttpResponse(
        false,
        'Error into getIncomesPer',
        { error: error.message },
        400,
      );
    }
  }

  async getBillsPer(date: string) {
    try {
      const firstDayOfYear = moment(date)
        .startOf('year')
        .format('YYYY-MM-DD HH:mm:ss.SSS');
      const lastDayOfYear = moment(date)
        .endOf('year')
        .format('YYYY-MM-DD HH:mm:ss.SSS');

      const firstDayOfMonth = moment(date)
        .startOf('month')
        .format('YYYY-MM-DD HH:mm:ss.SSS');
      const lastDayOfMonth = moment(date)
        .endOf('month')
        .format('YYYY-MM-DD HH:mm:ss.SSS');

      const firstHourOfDay = moment(date)
        .startOf('day')
        .format('YYYY-MM-DD HH:mm:ss.SSS');
      const lastHourOfDay = moment(date)
        .endOf('day')
        .format('YYYY-MM-DD HH:mm:ss.SSS');

      const billsPerYear = await this.billRepository.findBy({
        created_at: Between(new Date(firstDayOfYear), new Date(lastDayOfYear)),
      });

      const billsPerMonth = await this.billRepository.findBy({
        created_at: Between(
          new Date(firstDayOfMonth),
          new Date(lastDayOfMonth),
        ),
      });

      const billsPerDay = await this.billRepository.findBy({
        created_at: Between(new Date(firstHourOfDay), new Date(lastHourOfDay)),
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

      const billsPer = [
        this.moneyService.toFixed(amountPerYear),
        this.moneyService.toFixed(amountPerMonth),
        this.moneyService.toFixed(amountPerDay),
      ];
      return new HttpResponse(true, 'Return bills', { billsPer });
    } catch (error) {
      return new HttpResponse(
        false,
        'Error into getIncomesPer',
        { error: error.message },
        400,
      );
    }
  }

  async getBillsInFormat() {
    try {
      const bills = await this.billRepository
        .createQueryBuilder()
        .select('created_at', 'name')
        .addSelect('amount', 'value')
        .execute();

      const billsInFormat = {
        name: 'Bills',
        series: bills,
      };

      return new HttpResponse(true, 'Bills find successfully!', {
        data: billsInFormat,
      });
    } catch (error) {
      return new HttpResponse(
        false,
        'Error into getBillsInFormat',
        { error: error.message },
        400,
      );
    }
  }

  async getTopOneCategory() {
    try {
      const bills = await this.billRepository.find({ relations: ['category'] });

      const grouped = bills.reduce((previousValue: any, currentValue: any) => {
        (previousValue[currentValue.category['name']] =
          previousValue[currentValue.category['name']] || []).push(
          currentValue,
        );
        return previousValue;
      }, {});

      const result = [];
      for (const key in grouped) {
        const category = key;
        let amount = 0;
        for (const bill of grouped[category] as Bill[]) {
          amount += bill.amount;
        }
        result.push({ category, amount });
      }

      result.sort((a, b) => a.amount - b.amount);

      return new HttpResponse(
        true,
        'Top One Category find successfully!',
        result.pop(),
      );
    } catch (error) {
      return new HttpResponse(
        false,
        error.message,
        { error: error.message },
        400,
      );
    }
  }

  async getIncomesVsBills(year: number) {
    const incomesVsBill: IncomesVsBill[] = [];

    for (const month in MonthOfYear) {
      const ivb: IncomesVsBill = new IncomesVsBill(month, []);

      const first = moment(`${year}-${MonthOfYear[month]}-15`)
        .startOf('month')
        .format('YYYY-MM-DD HH:mm:ss.SSS');
      const last = moment(`${year}-${MonthOfYear[month]}-15`)
        .endOf('month')
        .format('YYYY-MM-DD HH:mm:ss.SSS');

      const incomeOfMonth = await this.incomeRepository.findBy({
        created_at: Between(new Date(first), new Date(last)),
      });
      let countIncome: number = 0.0;
      for (const income of incomeOfMonth) {
        countIncome += income.amount;
      }

      const billsOfMonth = await this.billRepository.findBy({
        created_at: Between(new Date(first), new Date(last)),
      });
      let countBill: number = 0.0;
      for (const bill of billsOfMonth) {
        countBill += bill.amount;
      }

      const infoIncomes: InformationOfGraphic = new InformationOfGraphic(
        'Incomes',
        parseFloat(countIncome.toFixed(2)),
      );
      const infoBills: InformationOfGraphic = new InformationOfGraphic(
        'Bills',
        parseFloat(countBill.toFixed(2)),
      );

      ivb.series.push(infoIncomes);
      ivb.series.push(infoBills);

      incomesVsBill.push(ivb);
    }

    return incomesVsBill;
  }

  async getNoCompleteObjectives() {
    try {
      const noCompleteObjectives = await this.objectiveRepository.find({
        where: { complete: false },
        relations: { contributions: true },
      });
      for (const objective of noCompleteObjectives) {
        let percentage: number = 0;
        for (const contribution of objective.contributions) {
          percentage += contribution.amount;
        }
        objective.percentage = percentage;
      }
      return new HttpResponse(
        true,
        'No complete objectives was successfully found!!',
        noCompleteObjectives,
      );
    } catch (error) {
      return new HttpResponse(
        false,
        'Error into getNoCompleteObjectives!!',
        { error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getIncomes() {
    try {
      const incomes = await this.incomeRepository.find({
        relations: {
          origin: true,
        },
        where: {
          visible: true,
        },
        order: {
          created_at: 'desc',
        },
      });

      return new HttpResponse(true, 'Return incomes', incomes);
    } catch (error) {
      return new HttpResponse(
        false,
        'Error into getIncomesPer',
        { error: error.message },
        400,
      );
    }
  }

  async getBills() {
    try {
      const bills = await this.billRepository.find({
        relations: {
          institution: true,
          payment: true,
          card: true,
        },
        where: {
          visible: true,
        },
        order: {
          created_at: 'desc',
        },
      });

      return new HttpResponse(true, 'Return bills', bills);
    } catch (error) {
      return new HttpResponse(
        false,
        'Error into getIncomesPer',
        { error: error.message },
        400,
      );
    }
  }

  async getCategoriesToGraphic(options: CategoryOptions) {
    try {
      const categories: CategoryGraphic[] = [];
      const othersCategory: CategoryGraphic = new CategoryGraphic(0, 'Others');

      const firstDayOfYear = moment(`${options.year}-01-01`)
        .startOf('year')
        .format('YYYY-MM-DD HH:mm:ss.SSS');
      const lastDayOfYear = moment(`${options.year}-01-01`)
        .endOf('year')
        .format('YYYY-MM-DD HH:mm:ss.SSS');

      const response = await this.categoryRepository.find({
        relations: { bills: true },
        where: {
          bills: {
            created_at: Between(
              new Date(firstDayOfYear),
              new Date(lastDayOfYear),
            ),
          },
        },
      });

      for (const category of response) {
        if (category.graphic) {
          const newCategory: CategoryGraphic = new CategoryGraphic(
            category.id,
            category.name,
            category.icon,
          );

          for (const bill of category.bills) {
            newCategory.addValue(bill.amount);
          }

          const lastBill: Bill = category.bills.at(-1);
          if (lastBill) {
            newCategory.setLastBillDate(lastBill.created_at);
          }

          categories.push(newCategory);
          continue;
        }

        for (const bill of category.bills) {
          othersCategory.addValue(bill.amount);
        }
      }
      if (othersCategory.value !== 0) {
        categories.push(othersCategory);
      }

      const resultCategories: CategoryGraphic[] = categories.sort(
        (a, b) => a.value - b.value,
      );

      resultCategories.map((category: CategoryGraphic) => {
        category.value = this.moneyService.toFixed(category.value);
      });

      return new HttpResponse(true, 'Return categories', resultCategories);
    } catch (error) {
      return new HttpResponse(
        false,
        'Error into getCategoriesToGraphic',
        { error: error.message },
        400,
      );
    }
  }
}
