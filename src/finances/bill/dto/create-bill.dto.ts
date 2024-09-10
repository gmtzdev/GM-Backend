import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Card } from 'src/finances/card/entities/card.entity';
import { Category } from 'src/finances/category/entities/category.entity';
import { Debt } from 'src/finances/debt/entities/debt.entity';
import { Institution } from 'src/finances/institution/entities/institution.entity';
import { Payment } from 'src/finances/payment/entities/payment.entity';

export class CreateBillDto {
  @IsString()
  @IsNotEmpty()
  concept: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsBoolean()
  visible: boolean;

  @IsNotEmpty()
  @IsDateString()
  created_at: Date;

  @IsNotEmpty()
  @IsObject()
  category: Category;

  @IsNotEmpty()
  @IsObject()
  payment: Payment;

  @IsNotEmpty()
  @IsObject()
  card: Card;

  @IsNotEmpty()
  @IsObject()
  institution: Institution;

  @IsOptional({ always: true })
  @IsObject()
  // @ValidateNested()
  // @Type(() => CreateDebtDto)
  debt?: Debt;
}
