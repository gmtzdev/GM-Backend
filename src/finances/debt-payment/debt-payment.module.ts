import { Module } from '@nestjs/common';
import { DebtPaymentService } from './debt-payment.service';
import { DebtPaymentController } from './debt-payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtPayment } from './entities/debt-payment.entity';
import { DebtModule } from '../debt/debt.module';

@Module({
  imports: [TypeOrmModule.forFeature([DebtPayment], 'finance'), DebtModule],
  controllers: [DebtPaymentController],
  providers: [DebtPaymentService],
  exports: [DebtPaymentService],
})
export class DebtPaymentModule {}
