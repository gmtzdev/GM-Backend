import { Module } from '@nestjs/common';
import { FinancesService } from './finances.service';
import { FinancesController } from './finances.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entity
import { Bill } from 'src/finances/bill/entities/bill.entity';
import { Income } from 'src/finances/income/entities/income.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Bill, Income],
      'finance'
    )
  ],
  controllers: [FinancesController],
  providers: [FinancesService],
})
export class FinancesModule {}
