import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';
import { Origin } from 'src/finances/origin/entities/origin.entity';

export class CreateIncomeDto {
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
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
  origin: Origin;
}
