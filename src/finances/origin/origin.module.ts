import { Module } from '@nestjs/common';
import { OriginService } from './origin.service';
import { OriginController } from './origin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entity
import { Origin } from './entities/origin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Origin], 'finance')
  ],
  controllers: [OriginController],
  providers: [OriginService],
})
export class OriginModule {}
