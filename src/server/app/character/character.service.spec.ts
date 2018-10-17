import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { CharacterService } from '@Character/character.service';
import { Character } from '@Entity/character.entity';

const mockRepo = {};

describe('CharacterService', () => {
  let service: CharacterService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharacterService,
        {
          useValue: mockRepo,
          provide: getRepositoryToken(Character)
        }
      ]
    }).compile();
    service = module.get<CharacterService>(CharacterService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
