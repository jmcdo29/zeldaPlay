import { Test, TestingModule } from '@nestjs/testing';
import { LocalService } from './local.service';

describe('LocalService', () => {
  let service: LocalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalService],
    }).compile();

    service = module.get<LocalService>(LocalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
