import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NavItemService } from './nav-item.service';
import { CreateNavItemDto } from './dto/create-nav-item.dto';
import { UpdateNavItemDto } from './dto/update-nav-item.dto';

@Controller('navitem')
export class NavItemController {
  constructor(private readonly navItemService: NavItemService) {}

  @Post()
  create(@Body() createNavItemDto: CreateNavItemDto) {
    return this.navItemService.create(createNavItemDto);
  }

  @Get()
  findAll() {
    return this.navItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.navItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNavItemDto: UpdateNavItemDto) {
    return this.navItemService.update(+id, updateNavItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.navItemService.remove(+id);
  }
}
