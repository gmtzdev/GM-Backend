import { Module } from '@nestjs/common';
// Services
import { FinancesService } from './finances.service';
import { MoneyService } from 'src/shared/services/money.service';

// Controllers
import { FinancesController } from './finances.controller';

import { TypeOrmModule } from '@nestjs/typeorm';

// Entity
import { Bill } from 'src/finances/bill/entities/bill.entity';
import { Income } from 'src/finances/income/entities/income.entity';
import { Objective } from 'src/finances/objective/entities/objective.entity';
import { Category } from 'src/finances/category/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Bill, Income, Objective, Category],
      'finance'
    ),
  ],
  controllers: [FinancesController],
  providers: [
    FinancesService,
    MoneyService
  ],
})
export class FinancesModule {}
