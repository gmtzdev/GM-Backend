import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryTaskService } from '../category-task/category-task.service';
import { ListService } from '../list/list.service';
import { HttpResponse } from 'src/core/models/http/HttpResponse.model';
import { SetReadyTaskDto } from './dto/setready-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task, 'productivity')
    private readonly taskRepository: Repository<Task>,
    private readonly listService: ListService,
    private readonly categoryTaskService: CategoryTaskService,
  ) {}

  public async create(createTaskDto: CreateTaskDto): Promise<HttpResponse> {
    if (!createTaskDto.list) {
      createTaskDto.list = await this.listService.getDefaultList();
    }
    if (!createTaskDto.categories) {
      createTaskDto.categories = [
        await this.categoryTaskService.getDefaultCategory(),
      ];
    }
    const task = await this.taskRepository.save(createTaskDto);
    return new HttpResponse(true, `Task created successfully`, task);
  }

  public async findAll(): Promise<HttpResponse> {
    const tasks = await this.taskRepository.find({
      relations: { list: true, categories: true },
    });
    return new HttpResponse(true, `All tasks finded`, tasks);
  }

  public findOne(id: number): Promise<Task> {
    return this.taskRepository.findOneBy({ id });
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    console.log(updateTaskDto);
    return `This action updates a #${id} task`;
  }

  public async setReady(
    id: number,
    setReadyTaskDto: SetReadyTaskDto,
  ): Promise<HttpResponse> {
    const result = await this.taskRepository.update(
      { id },
      { ready: setReadyTaskDto.ready },
    );
    if (result.affected !== 1)
      throw new HttpException(
        `The Task with id = ${id} was not updated`,
        HttpStatus.CONFLICT,
      );
    return new HttpResponse(
      true,
      `Task with id = ${id} updated successfully`,
      {},
    );
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }

  public async getTaskListOfFilter(id: number, type: string) {
    let result = null;
    if (type === 'List') {
      const list = await this.listService.findOne(id);
      result = await this.taskRepository.find({
        relations: {
          list: true,
        },
        where: {
          list: list,
        },
      });

      return new HttpResponse(true, `The task of list with id: ${id}`, result);
    } else {
      const category = await this.categoryTaskService.findOne(id);
      this.taskRepository.find({
        relations: {
          categories: true,
        },
        where: {
          categories: category,
        },
      });
      return new HttpResponse(
        true,
        `The task of category with id: ${id}`,
        result,
      );
    }
  }
}
