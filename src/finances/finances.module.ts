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
import { BillModule } from './bill/bill.module';
import { CardModule } from './card/card.module';
import { CategoryModule } from './category/category.module';
import { ContributionModule } from './contribution/contribution.module';
import { DebtModule } from './debt/debt.module';
import { DebtPaymentModule } from './debt-payment/debt-payment.module';
import { IncomeModule } from './income/income.module';
import { InstitutionModule } from './institution/institution.module';
import { ObjectiveModule } from './objective/objective.module';
import { OriginModule } from './origin/origin.module';
import { PaymentModule } from './payment/payment.module';
import { PayCreditCardModule } from './pay-credit-card/pay-credit-card.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bill, Income, Objective, Category], 'finance'),
    BillModule,
    CardModule,
    CategoryModule,
    ContributionModule,
    DebtModule,
    DebtPaymentModule,
    IncomeModule,
    InstitutionModule,
    ObjectiveModule,
    OriginModule,
    PaymentModule,
    PayCreditCardModule,
  ],
  controllers: [FinancesController],
  providers: [FinancesService, MoneyService],
})
export class FinancesModule {}
