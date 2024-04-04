import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entity
import { Category } from './entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Category],
      'finance'
    )
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
