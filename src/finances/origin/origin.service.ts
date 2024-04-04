import { Injectable } from '@nestjs/common';
import { CreateOriginDto } from './dto/create-origin.dto';
import { UpdateOriginDto } from './dto/update-origin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Origin } from './entities/origin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OriginService {

  constructor(
    @InjectRepository(Origin, 'finance')
    private originRepository: Repository<Origin>
  ){}

  create(createOriginDto: CreateOriginDto) {
    const newOrigin = this.originRepository.create(createOriginDto);
    return this.originRepository.save(newOrigin);
  }

  findAll() {
    return this.originRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} origin`;
  }

  update(id: number, updateOriginDto: UpdateOriginDto) {
    return `This action updates a #${id} origin`;
  }

  remove(id: number) {
    return `This action removes a #${id} origin`;
  }
}
