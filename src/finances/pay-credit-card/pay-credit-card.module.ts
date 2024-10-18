import { Module } from '@nestjs/common';
import { PayCreditCardController } from './pay-credit-card.controller';
import { PayCreditCardService } from './pay-credit-card.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayCreditCard } from './entities/pay-credit-card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PayCreditCard], 'finance')],
  controllers: [PayCreditCardController],
  providers: [PayCreditCardService],
  exports: [PayCreditCardService],
})
export class PayCreditCardModule {}
