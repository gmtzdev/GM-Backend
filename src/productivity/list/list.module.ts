import { Module, OnModuleInit } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './entities/list.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([List], 'productivity')
  ],
  controllers: [ListController],
  providers: [ListService],
  exports: [ListService]
})
export class ListModule implements OnModuleInit {

  constructor(private readonly listService: ListService) { }

  async onModuleInit() {
    const listCount = await this.listService.count();
    if (listCount === 0)
      this.listService.createDefaultList();
  }

}
