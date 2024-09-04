import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateObjectiveDto } from './dto/create-objective.dto';
import { UpdateObjectiveDto } from './dto/update-objective.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Objective } from './entities/objective.entity';
import { HttpResponse } from 'src/core/models/http/HttpResponse.model';

@Injectable()
export class ObjectiveService {
  constructor(
    @InjectRepository(Objective, 'finance')
    private objectiveRepository: Repository<Objective>,
  ) {}

  async create(createObjectiveDto: CreateObjectiveDto) {
    try {
      const newObjective = this.objectiveRepository.create(createObjectiveDto);
      const objective = await this.objectiveRepository.save(newObjective);
      if (!(objective instanceof Objective)) {
        // Error
        return new HttpException(
          'No objective created!!',
          HttpStatus.BAD_REQUEST,
          {
            cause: {
              message:
                'The objecte returned after creation is not a instance of Objective',
            },
          },
        );
      }
      return new HttpResponse(
        true,
        'Objective created successfully!!',
        objective,
        HttpStatus.CREATED,
      );
    } catch (error) {
      return new HttpException(
        'No objective created!!',
        HttpStatus.BAD_REQUEST,
        { cause: { error: error.message } },
      );
    }
  }

  async findAll() {
    try {
      const objectives = await this.objectiveRepository.find();
      return new HttpResponse(
        true,
        'Objectives were successfully found!',
        objectives,
      );
    } catch (error) {
      return new HttpResponse(
        false,
        'Error when searching for Objectives',
        { error: error.message },
        400,
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} objective`;
  }

  update(id: number, updateObjectiveDto: UpdateObjectiveDto) {
    console.log(updateObjectiveDto);
    return `This action updates a #${id} objective`;
  }

  remove(id: number) {
    return `This action removes a #${id} objective`;
  }
}
