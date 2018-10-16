import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Character } from '@Entity/character.entity';
import { CharacterService } from './character.service';

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
