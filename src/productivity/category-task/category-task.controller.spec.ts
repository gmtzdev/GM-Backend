import { Test, TestingModule } from '@nestjs/testing';
import { CategoryTaskController } from './category-task.controller';
import { CategoryTaskService } from './category-task.service';

describe('CategoryTaskController', () => {
  let controller: CategoryTaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryTaskController],
      providers: [CategoryTaskService],
    }).compile();

    controller = module.get<CategoryTaskController>(CategoryTaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
