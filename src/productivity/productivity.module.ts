import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { ListModule } from './list/list.module';
import { CategoryTaskModule } from './category-task/category-task.module';

@Module({
  imports: [TaskModule, ListModule, CategoryTaskModule],
  controllers: [],
  providers: [],
})
export class ProductivityModule {}
