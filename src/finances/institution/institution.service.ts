import { Injectable } from '@nestjs/common';
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
    return new HttpResponse(true, 'Bill created successfully', institution);
  }

  findAll() {
    return this.institutionRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} institution`;
  }

  update(id: number, updateInstitutionDto: UpdateInstitutionDto) {
    console.log(updateInstitutionDto);
    return `This action updates a #${id} institution`;
  }

  remove(id: number) {
    return `This action removes a #${id} institution`;
  }
}
