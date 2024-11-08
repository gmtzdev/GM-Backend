import { Injectable } from '@nestjs/common';
import { CreateCategoryTaskDto } from './dto/create-category-task.dto';
import { UpdateCategoryTaskDto } from './dto/update-category-task.dto';
import { Repository } from 'typeorm';
import { CategoryTask } from './entities/category-task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpResponse } from 'src/core/models/http/HttpResponse.model';

@Injectable()
export class CategoryTaskService {
  private readonly DEFAULT_CATEGORIES: CreateCategoryTaskDto[] = [
    { name: 'Mi día' },
    { name: 'Importante' },
    { name: 'Planeado' },
    { name: 'Asignado a mí' },
    { name: 'Tareas' },
  ];

  constructor(
    @InjectRepository(CategoryTask, 'productivity')
    private readonly categoryTaskRepository: Repository<CategoryTask>,
  ) {}

  public async count(): Promise<number> {
    return await this.categoryTaskRepository.count();
  }

  public async createDefaultCategoryTask() {
    const defaultCategoryTask: CreateCategoryTaskDto[] =
      this.DEFAULT_CATEGORIES;
    await this.categoryTaskRepository.save(defaultCategoryTask);
  }
  public async getDefaultCategory() {
    return await this.categoryTaskRepository.findOneBy({
      name: this.DEFAULT_CATEGORIES[4].name,
    });
  }

  public create(
    createCategoryTaskDto: CreateCategoryTaskDto,
  ): Promise<CategoryTask> {
    return this.categoryTaskRepository.save(createCategoryTaskDto);
  }

  public async findAll(): Promise<HttpResponse> {
    const categories = await this.categoryTaskRepository.find();
    return new HttpResponse(true, 'All categories task finded', categories);
  }

  public findOne(id: number): Promise<CategoryTask> {
    return this.categoryTaskRepository.findOneBy({ id });
  }

  update(id: number, updateCategoryTaskDto: UpdateCategoryTaskDto) {
    console.log(updateCategoryTaskDto);
    return `This action updates a #${id} categoryTask`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoryTask`;
  }
}
