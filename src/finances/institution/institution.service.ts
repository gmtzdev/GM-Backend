import { Injectable } from '@nestjs/common';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { Repository } from 'typeorm';
import { Institution } from './entities/institution.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InstitutionService {

  constructor(
    @InjectRepository(Institution, 'finance')
    private institutionRepository: Repository<Institution>
  ) { }

  create(createInstitutionDto: CreateInstitutionDto) {
    const newInstitution = this.institutionRepository.create(createInstitutionDto);
    return this.institutionRepository.save(newInstitution);
  }

  findAll() {
    return this.institutionRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} institution`;
  }

  update(id: number, updateInstitutionDto: UpdateInstitutionDto) {
    return `This action updates a #${id} institution`;
  }

  remove(id: number) {
    return `This action removes a #${id} institution`;
  }
}
