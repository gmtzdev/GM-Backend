import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { CategoryTaskModule } from '../category-task/category-task.module';
import { ListModule } from '../list/list.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task], 'productivity'),
    ListModule,
    CategoryTaskModule
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule { }
