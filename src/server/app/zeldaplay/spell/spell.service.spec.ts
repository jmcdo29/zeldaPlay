import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

import { DbSpell } from '@DbModel/index';
import { SpellService } from '@Spell/spell.service';
import { DbSpellService } from './db-spell/db-spell.service';

const mockRepo = {
  getSpells: jest
    .fn()
    .mockReturnValue(of([new DbSpell(), new DbSpell(), new DbSpell()])),
  newSpell: jest.fn().mockReturnValue(of(new DbSpell())),
  updateSpell: jest.fn().mockReturnValue(of(new DbSpell()))
};

const charId = '00Ctest12345';

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
  it('should call getSpells()', () => {
    service.getSpells(charId).subscribe((spells) => {
      expect(mockRepo.getSpells).toBeCalledTimes(1);
      expect(mockRepo.getSpells).toBeCalledWith(charId);
      expect(spells).toEqual([new DbSpell(), new DbSpell(), new DbSpell()]);
    });
  });
  it('should call newSpell()', () => {
    service.newSpell(new DbSpell(), charId).subscribe((newSpell) => {
      expect(mockRepo.newSpell).toBeCalledTimes(1);
      expect(mockRepo.newSpell).toBeCalledWith(new DbSpell(), charId);
      expect(newSpell).toEqual(new DbSpell());
    });
  });
  it('should call updateSpell()', () => {
    service.updateSpell(new DbSpell()).subscribe((updatedSpell) => {
      expect(mockRepo.updateSpell).toBeCalledTimes(1);
      expect(mockRepo.updateSpell).toBeCalledWith(new DbSpell());
      expect(updatedSpell).toEqual(new DbSpell());
    });
  });
});
