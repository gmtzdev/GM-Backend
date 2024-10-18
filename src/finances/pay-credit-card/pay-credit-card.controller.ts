import { Controller, Get, Post } from '@nestjs/common';
import { PayCreditCardService } from './pay-credit-card.service';

@Controller('finances/payCreditCard')
export class PayCreditCardController {
  constructor(private readonly payCreditCardService: PayCreditCardService) {}

  @Get('getCurrentDate')
  getCurrentDate() {
    return this.payCreditCardService.getCurrentDatePayCreditCard();
  }

  @Get('getDaysToPayCreditCard')
  getDaysToPayCreditCard() {
    return this.payCreditCardService.getDaysToPayCreditCard();
  }

  @Post('createNextDate')
  createNextDate() {
    return this.payCreditCardService.createNextDate();
  }
}
