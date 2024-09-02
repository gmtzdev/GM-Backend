import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDebtDto {
  @IsNotEmpty()
  @IsString()
  debt: string;

  @IsNotEmpty()
  @IsString()
  description: string = '';

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
