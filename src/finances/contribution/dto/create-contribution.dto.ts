import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Objective } from 'src/finances/objective/entities/objective.entity';

export class CreateContributionDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  message?: string;

  @IsNotEmpty()
  @IsDateString()
  created_at: Date;

  @IsNotEmpty()
  objective: Objective;
}
