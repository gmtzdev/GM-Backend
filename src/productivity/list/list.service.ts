import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { Repository } from 'typeorm';
import { List } from './entities/list.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpResponse } from 'src/core/models/http/HttpResponse.model';

@Injectable()
export class ListService {
  private readonly DEFAULT_LIST: CreateListDto[] = [{ name: 'Mi Lista' }];

  constructor(
    @InjectRepository(List, 'productivity')
    private readonly listRepository: Repository<List>,
  ) {}

  public async createDefaultList(): Promise<void> {
    const defaultList = this.DEFAULT_LIST;
    await this.listRepository.save(defaultList);
  }
  public async getDefaultList(): Promise<List> {
    return await this.listRepository.findOneBy({
      name: this.DEFAULT_LIST[0].name,
    });
  }

  public async count(): Promise<number> {
    return await this.listRepository.count();
  }

  public async create(createListDto: CreateListDto) {
    this.listRepository.save(createListDto);
  }

  public async findAll(): Promise<HttpResponse> {
    const lists = await this.listRepository.find();
    return new HttpResponse(true, 'All list finded', lists);
  }

  public findOne(id: number): Promise<List> {
    return this.listRepository.findOneBy({ id });
  }

  update(id: number, updateListDto: UpdateListDto) {
    console.log(updateListDto);
    return `This action updates a #${id} list`;
  }

  remove(id: number) {
    return `This action removes a #${id} list`;
  }
}
