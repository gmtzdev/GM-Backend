import { Injectable } from '@nestjs/common';
import { CreateNavItemDto } from './dto/create-nav-item.dto';
import { UpdateNavItemDto } from './dto/update-nav-item.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NavItem } from './entities/nav-item.entity';
import { HttpResponse } from 'src/core/models/http/HttpResponse.model';

@Injectable()
export class NavItemService {
  constructor(
    @InjectRepository(NavItem, 'gmproject')
    private navItemRepository: Repository<NavItem>,
  ) {}

  create(createNavItemDto: CreateNavItemDto) {
    const newNavItem = this.navItemRepository.create(createNavItemDto);
    return this.navItemRepository.save(newNavItem);
  }

  async findAll() {
    const navItems = await this.navItemRepository.find();
    return new HttpResponse(true, 'Nav items were found!!', navItems);
  }

  findOne(id: number) {
    return `This action returns a #${id} navItem`;
  }

  update(id: number, updateNavItemDto: UpdateNavItemDto) {
    // TODO Implements this service
    console.log(updateNavItemDto);
    return `This action updates a #${id} navItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} navItem`;
  }
}
