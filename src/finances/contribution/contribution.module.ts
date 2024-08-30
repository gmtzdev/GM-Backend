import { Module } from '@nestjs/common';
import { ContributionService } from './contribution.service';
import { ContributionController } from './contribution.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contribution } from './entities/contribution.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contribution], 'finance')
  ],
  controllers: [ContributionController],
  providers: [ContributionService],
})
export class ContributionModule {}
