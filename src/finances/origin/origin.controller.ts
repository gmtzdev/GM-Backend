import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OriginService } from './origin.service';
import { CreateOriginDto } from './dto/create-origin.dto';
import { UpdateOriginDto } from './dto/update-origin.dto';

@Controller('finances/origin')
export class OriginController {
  constructor(private readonly originService: OriginService) {}

  @Post()
  create(@Body() createOriginDto: CreateOriginDto) {
    return this.originService.create(createOriginDto);
  }

  @Get()
  findAll() {
    return this.originService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.originService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOriginDto: UpdateOriginDto) {
    return this.originService.update(+id, updateOriginDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.originService.remove(+id);
  }
}
