import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { SpellService } from '@Character/spell/spell.service';
import { Spell } from '@Entity/spell.entity';

const mockRepo = {};

describe('SpellService', () => {
  let service: SpellService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpellService,
        {
          provide: getRepositoryToken(Spell),
          useValue: mockRepo
        }
      ]
    }).compile();
    service = module.get<SpellService>(SpellService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
