import { PartialType } from '@nestjs/swagger';
import { CreateCategoryTaskDto } from './create-category-task.dto';

export class UpdateCategoryTaskDto extends PartialType(CreateCategoryTaskDto) {}
