import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateObjectiveDto } from './dto/create-objective.dto';
import { UpdateObjectiveDto } from './dto/update-objective.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Objective } from './entities/objective.entity';
import { HttpResponse } from 'src/shared/models/HttpResponse.model';

@Injectable()
export class ObjectiveService {
  constructor(
    @InjectRepository(Objective, 'finance')
    private objectiveRepository: Repository<Objective>
  ) { }

  create(createObjectiveDto: CreateObjectiveDto) {
    const newObjective = this.objectiveRepository.create(createObjectiveDto);
    const objective = this.objectiveRepository.save(newObjective);
    if (!(objective instanceof Objective)) {
      // Error
      return new HttpException('No objective created!!', HttpStatus.BAD_REQUEST, { cause: new Error('The objecte returned after creation is not a instance of Objective') });
    }
    return new HttpResponse(true, 'Objective created successfully!!', objective, HttpStatus.CREATED);
  }

  findAll() {
    return `This action returns all objective`;
  }

  findOne(id: number) {
    return `This action returns a #${id} objective`;
  }

  update(id: number, updateObjectiveDto: UpdateObjectiveDto) {
    return `This action updates a #${id} objective`;
  }

  remove(id: number) {
    return `This action removes a #${id} objective`;
  }
}
