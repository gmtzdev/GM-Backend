import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entity
import { Payment } from './entities/payment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Payment],
      'finance'
    )
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule { }
