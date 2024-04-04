import { Module } from '@nestjs/common';
import { InstitutionService } from './institution.service';
import { InstitutionController } from './institution.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entity
import { Institution } from './entities/institution.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Institution],
      'finance'
    )
  ],
  controllers: [InstitutionController],
  providers: [InstitutionService],
})
export class InstitutionModule { }
