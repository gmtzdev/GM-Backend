import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { Repository } from 'typeorm';
import { Institution } from './entities/institution.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpResponse } from 'src/core/models/http/HttpResponse.model';

@Injectable()
export class InstitutionService {
  constructor(
    @InjectRepository(Institution, 'finance')
    private institutionRepository: Repository<Institution>,
  ) {}

  async create(createInstitutionDto: CreateInstitutionDto) {
    const newInstitution =
      this.institutionRepository.create(createInstitutionDto);
    const institution = await this.institutionRepository.save(newInstitution);
    if (!(institution instanceof Institution)) {
      // Error
    }
    return new HttpResponse(
      true,
      'Institution created successfully',
      institution,
    );
  }

  async findAll() {
    const institutions = await this.institutionRepository.find();
    return new HttpResponse(true, 'Institutions were found!!', institutions);
  }

  public async findAllWithDebt() {
    const institutions = await this.institutionRepository.find({
      relations: { debts: true },
    });
    return new HttpResponse(true, 'Institutions were found!!', institutions);
  }

  public async findByName(name: string) {
    const institutions = await this.institutionRepository
      .createQueryBuilder('inst')
      .where('inst.name like :name', { name: `%${name}%` })
      .getManyAndCount();
    if (!institutions) {
      throw new HttpException(
        `Institutions with name like #${name}# were not found!!`,
        HttpStatus.NOT_FOUND,
      );
    }
    return new HttpResponse(true, 'Institutions were found!!', institutions);
  }

  findOne(id: number) {
    return `This action returns a #${id} institution`;
  }

  public async update(id: number, updateInstitutionDto: UpdateInstitutionDto) {
    const result = await this.institutionRepository.update(
      id,
      updateInstitutionDto,
    );
    if (result.affected !== 1) {
      throw new HttpException(
        `Some error ocurred updating institution with id: ${id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return new HttpResponse(
      true,
      `Update a #${id} institution`,
      updateInstitutionDto,
    );
  }

  remove(id: number) {
    return `This action removes a #${id} institution`;
  }
}
