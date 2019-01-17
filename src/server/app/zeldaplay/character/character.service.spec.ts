import { Test, TestingModule } from '@nestjs/testing';

import { CharacterService } from '@Character/character.service';
import { DbCharacterService } from './db-character/db-character.service';

describe('CharacterService', () => {
  let service: CharacterService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharacterService,
        {
          provide: DbCharacterService,
          useValue: {}
        }
      ]
    }).compile();
    service = module.get<CharacterService>(CharacterService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
