import { Test, TestingModule } from '@nestjs/testing';

import { SpellService } from '@Spell/spell.service';
import { DbSpellService } from './db-spell/db-spell.service';
import { DbSpell } from '@Db/models/db_spell.table';

const mockRepo = {
  getSpells: jest
    .fn<DbSpell[]>()
    .mockReturnValue([new DbSpell(), new DbSpell(), new DbSpell()]),
  newSpell: jest.fn<DbSpell>().mockReturnValue(new DbSpell()),
  updateSpell: jest.fn<DbSpell>().mockReturnValue(new DbSpell())
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
  it('should call getSpells()', async () => {
    const spells = await service.getSpells(charId);
    expect(mockRepo.getSpells).toBeCalledTimes(1);
    expect(mockRepo.getSpells).toBeCalledWith(charId);
    expect(spells).toEqual([new DbSpell(), new DbSpell(), new DbSpell()]);
  });
  it('should call newSpell()', async () => {
    const newSpell = await service.newSpell(new DbSpell(), charId);
    expect(mockRepo.newSpell).toBeCalledTimes(1);
    expect(mockRepo.newSpell).toBeCalledWith(new DbSpell(), charId);
    expect(newSpell).toEqual(new DbSpell());
  });
  it('should call updateSpell()', async () => {
    const updatedSpell = await service.updateSpell(new DbSpell());
    expect(mockRepo.updateSpell).toBeCalledTimes(1);
    expect(mockRepo.updateSpell).toBeCalledWith(new DbSpell());
    expect(updatedSpell).toEqual(new DbSpell());
  });
});
