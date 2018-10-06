import { Test, TestingModule } from '@nestjs/testing';
import { SaveService } from './save.service';

describe('SaveService', () => {
  let service: SaveService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SaveService]
    }).compile();
    service = module.get<SaveService>(SaveService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
