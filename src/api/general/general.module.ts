import { Module } from '@nestjs/common';
import { GeneralService } from './general.service';
import { GeneralController } from './general.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entity
import { Bill } from 'src/finances/bill/entities/bill.entity';
import { Income } from 'src/finances/income/entities/income.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bill, Income], 'finances')
  ],
  controllers: [GeneralController],
  providers: [GeneralService],
})
export class GeneralModule {}
