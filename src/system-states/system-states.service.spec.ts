import { Test, TestingModule } from '@nestjs/testing';
import { SystemStatesService } from './system-states.service';

describe('SystemStatesService', () => {
  let service: SystemStatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SystemStatesService],
    }).compile();

    service = module.get<SystemStatesService>(SystemStatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
