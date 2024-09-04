import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateContributionDto } from './dto/create-contribution.dto';
import { UpdateContributionDto } from './dto/update-contribution.dto';
import { Repository } from 'typeorm';
import { Contribution } from './entities/contribution.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpResponse } from 'src/core/models/http/HttpResponse.model';

@Injectable()
export class ContributionService {
  constructor(
    @InjectRepository(Contribution, 'finance')
    private contributionRepository: Repository<Contribution>,
  ) {}
  async create(createContributionDto: CreateContributionDto) {
    const newContribution = this.contributionRepository.create(
      createContributionDto,
    );
    const contribution =
      await this.contributionRepository.save(newContribution);
    if (!(contribution instanceof Contribution)) {
      // Error
      return new HttpException(
        'No contribution created!!',
        HttpStatus.BAD_REQUEST,
        {
          cause: {
            message:
              'The objecte returned after creation is not a instance of Contribution',
          },
        },
      );
    }

    return new HttpResponse(
      true,
      'Contribution created successfully!!',
      contribution,
      HttpStatus.CREATED,
    );
  }

  findAll() {
    return `This action returns all contribution`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contribution`;
  }

  update(id: number, updateContributionDto: UpdateContributionDto) {
    console.log(updateContributionDto);
    return `This action updates a #${id} contribution`;
  }

  remove(id: number) {
    return `This action removes a #${id} contribution`;
  }
}
