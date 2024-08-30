import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryTaskService } from '../category-task/category-task.service';
import { ListService } from '../list/list.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task, 'productivity')
    private readonly taskRepository: Repository<Task>,
    private readonly listService: ListService,
    private readonly categoryTaskService: CategoryTaskService,
  ) {}

  public async create(createTaskDto: CreateTaskDto) {
    if (!createTaskDto.list) {
      createTaskDto.list = await this.listService.getDefaultList();
    }
    if (!createTaskDto.categories) {
      createTaskDto.categories = [
        await this.categoryTaskService.getDefaultCategory(),
      ];
    }
    return this.taskRepository.save(createTaskDto);
  }

  public findAll(): Promise<Task[]> {
    return this.taskRepository.find({
      relations: { list: true, categories: true },
    });
  }

  public findOne(id: number): Promise<Task> {
    return this.taskRepository.findOneBy({ id });
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    console.log(updateTaskDto);
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
