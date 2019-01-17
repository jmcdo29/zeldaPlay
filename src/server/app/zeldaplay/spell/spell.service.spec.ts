import { Test, TestingModule } from '@nestjs/testing';

import { SpellService } from '@Spell/spell.service';
import { DbSpellService } from './db-spell/db-spell.service';

const mockRepo = {};

describe('SpellService', () => {
  let service: SpellService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpellService,
        {
          provide: DbSpellService,
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
