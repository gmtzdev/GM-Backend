import { Injectable } from '@nestjs/common';
import { CreateOriginDto } from './dto/create-origin.dto';
import { UpdateOriginDto } from './dto/update-origin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Origin } from './entities/origin.entity';
import { Repository } from 'typeorm';
import { HttpResponse } from 'src/core/models/http/HttpResponse.model';

@Injectable()
export class OriginService {
  constructor(
    @InjectRepository(Origin, 'finance')
    private originRepository: Repository<Origin>,
  ) {}

  create(createOriginDto: CreateOriginDto) {
    const newOrigin = this.originRepository.create(createOriginDto);
    return this.originRepository.save(newOrigin);
  }

  public async findAll() {
    const origins = await this.originRepository.find();
    return new HttpResponse(true, 'Origins were found!!', origins);
  }

  findOne(id: number) {
    return `This action returns a #${id} origin`;
  }

  update(id: number, updateOriginDto: UpdateOriginDto) {
    // TODO Implements this method
    console.log(updateOriginDto);
    return `This action updates a #${id} origin`;
  }

  remove(id: number) {
    return `This action removes a #${id} origin`;
  }
}
