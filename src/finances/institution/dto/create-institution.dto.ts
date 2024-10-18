import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInstitutionDto {
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  name: string;
}
