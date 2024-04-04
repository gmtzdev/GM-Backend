import { Module } from '@nestjs/common';
import { NavItemService } from './nav-item.service';
import { NavItemController } from './nav-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NavItem } from './entities/nav-item.entity';

@Module({
  imports:[TypeOrmModule.forFeature([NavItem], 'gmproject')],
  controllers: [NavItemController],
  providers: [NavItemService],
})
export class NavItemModule {}
