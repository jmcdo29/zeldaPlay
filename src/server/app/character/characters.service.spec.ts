import { Test, TestingModule } from '@nestjs/testing';
import { CharactersService } from './characters.service';

describe('CharactersService', () => {
  let service: CharactersService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharactersService],
    }).compile();
    service = module.get<CharactersService>(CharactersService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
