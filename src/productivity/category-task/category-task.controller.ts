import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryTaskService } from './category-task.service';
import { CreateCategoryTaskDto } from './dto/create-category-task.dto';
import { UpdateCategoryTaskDto } from './dto/update-category-task.dto';

@Controller('productivity/category-task')
export class CategoryTaskController {
  constructor(private readonly categoryTaskService: CategoryTaskService) {}

  @Post()
  create(@Body() createCategoryTaskDto: CreateCategoryTaskDto) {
    return this.categoryTaskService.create(createCategoryTaskDto);
  }

  @Get()
  findAll() {
    return this.categoryTaskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryTaskService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryTaskDto: UpdateCategoryTaskDto,
  ) {
    return this.categoryTaskService.update(+id, updateCategoryTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryTaskService.remove(+id);
  }
}
