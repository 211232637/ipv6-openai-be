import { Test, TestingModule } from '@nestjs/testing';
import { PlaybooksController } from './playbooks.controller';
import { PlaybooksService } from './playbooks.service';

describe('PlaybooksController', () => {
  let controller: PlaybooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaybooksController],
      providers: [PlaybooksService],
    }).compile();

    controller = module.get<PlaybooksController>(PlaybooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
