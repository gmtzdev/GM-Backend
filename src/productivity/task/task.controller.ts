import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { SetReadyTaskDto } from './dto/setready-task.dto';

@Controller('productivity/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Patch('/setReady/:id')
  setReady(@Param('id') id: string, @Body() setReadyTaskDto: SetReadyTaskDto) {
    return this.taskService.setReady(+id, setReadyTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }

  @Get('/getTaskListOfFilter/:id')
  getTaskListOfFilter(@Param('id') id: string, @Query() query) {
    const { type } = query;
    return this.taskService.getTaskListOfFilter(+id, type);
  }
}
