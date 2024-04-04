import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entity
import { Card } from './entities/card.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Card],
      'finance'
    )
  ],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
