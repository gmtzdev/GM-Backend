import { Module, OnModuleInit } from '@nestjs/common';
import { CategoryTaskService } from './category-task.service';
import { CategoryTaskController } from './category-task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryTask } from './entities/category-task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryTask], 'productivity')],
  controllers: [CategoryTaskController],
  providers: [CategoryTaskService],
  exports: [CategoryTaskService]
})
export class CategoryTaskModule implements OnModuleInit {

  constructor(
    private readonly categoryTaskService: CategoryTaskService
  ) { }

  async onModuleInit() {
    const categories = await this.categoryTaskService.count();
    if (categories === 0)
      await this.categoryTaskService.createDefaultCategoryTask();
  }

}
