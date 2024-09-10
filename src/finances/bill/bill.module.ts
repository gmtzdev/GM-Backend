import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from './entities/bill.entity';
import { DebtPaymentModule } from '../debt-payment/debt-payment.module';

@Module({
  imports: [TypeOrmModule.forFeature([Bill], 'finance'), DebtPaymentModule],
  controllers: [BillController],
  providers: [BillService],
})
export class BillModule {}
