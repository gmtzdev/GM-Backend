// import { PartialType } from '@nestjs/swagger';
import { Category } from 'src/finances/category/entities/category.entity';
import { Payment } from 'src/finances/payment/entities/payment.entity';
import { Card } from 'src/finances/card/entities/card.entity';
import { Institution } from 'src/finances/institution/entities/institution.entity';
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateBillDto {
  //extends PartialType(CreateBillDto) {
  @IsInt()
  id: number;

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  concept: string;

  @IsNumber()
  amount: number;

  @IsBoolean()
  visible: boolean;

  @IsDateString()
  created_at: Date;

  @IsDateString()
  updated_at: Date;

  @IsNotEmpty()
  category: Category;

  @IsNotEmpty()
  payment: Payment;

  @IsNotEmpty()
  card: Card;

  @IsNotEmpty()
  institution: Institution;
}
