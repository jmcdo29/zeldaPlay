import { Test, TestingModule } from '@nestjs/testing';
import { DbCharacterService } from './db-character.service';

describe('DbCharacterService', () => {
  let service: DbCharacterService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbCharacterService],
    }).compile();
    service = module.get<DbCharacterService>(DbCharacterService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
