import { IsBoolean, IsNotEmpty } from 'class-validator';

export class SetReadyTaskDto {
  @IsBoolean()
  @IsNotEmpty()
  ready: boolean;
}
