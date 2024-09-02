import { Test, TestingModule } from '@nestjs/testing';
import { DebtPaymentController } from './debt-payment.controller';
import { DebtPaymentService } from './debt-payment.service';

describe('DebtPaymentController', () => {
  let controller: DebtPaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DebtPaymentController],
      providers: [DebtPaymentService],
    }).compile();

    controller = module.get<DebtPaymentController>(DebtPaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
