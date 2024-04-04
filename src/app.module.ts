import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';

// GM Project
import { NavItem } from './gmproject/nav-item/entities/nav-item.entity';
import { User } from './gmproject/user/entities/user.entity';

import { NavItemModule } from './gmproject/nav-item/nav-item.module';
import { UserModule } from './gmproject/user/user.module';


// Finances
import { Bill } from './finances/bill/entities/bill.entity';
import { Income } from './finances/income/entities/income.entity';
import { Category } from './finances/category/entities/category.entity';
import { Card } from './finances/card/entities/card.entity';
import { Institution } from './finances/institution/entities/institution.entity';
import { Origin } from './finances/origin/entities/origin.entity';
import { Payment } from './finances/payment/entities/payment.entity';

import { BillModule } from './finances/bill/bill.module';
import { IncomeModule } from './finances/income/income.module';
import { CategoryModule } from './finances/category/category.module';
import { CardModule } from './finances/card/card.module';
import { InstitutionModule } from './finances/institution/institution.module';
import { OriginModule } from './finances/origin/origin.module';
import { PaymentModule } from './finances/payment/payment.module';


// API
import { GeneralModule } from './api/general/general.module';
import { FinancesModule } from './api/finances/finances.module';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'GMMtz1012',
      database: 'gmproject',
      entities: [
        User, 
        NavItem
      ],
      name: 'gmproject',
      synchronize: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'GMMtz1012',
      database: 'finance',
      entities: [
        Bill, 
        Income, 
        Category, 
        Card, 
        Institution, 
        Origin, 
        Payment
      ],
      name: 'finance',
      synchronize: true,
    }),

    NavItemModule,
    // UserModule,

    // Finances
    BillModule,
    IncomeModule,
    CategoryModule,
    CardModule,
    InstitutionModule,
    OriginModule,
    PaymentModule,

    // Global
    // GeneralModule,

    // Finances
    FinancesModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
