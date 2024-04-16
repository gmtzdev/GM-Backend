import { Module } from '@nestjs/common';
import { ObjectiveService } from './objective.service';
import { ObjectiveController } from './objective.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Objective } from './entities/objective.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Objective], 'finance')],
  controllers: [ObjectiveController],
  providers: [ObjectiveService],
})
export class ObjectiveModule {}
