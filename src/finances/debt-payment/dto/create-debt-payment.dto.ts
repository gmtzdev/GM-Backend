import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';
import { Debt } from 'src/finances/debt/entities/debt.entity';

export class CreateDebtPaymentDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsObject()
  debt: Debt;
}
