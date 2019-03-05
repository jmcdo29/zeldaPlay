import { Test, TestingModule } from '@nestjs/testing';
import { DbSpellService } from './db-spell.service';
import { DbService } from '@Db/db.service';
import { DbSpell } from '@DbModel/index';

const mockDb = {
  query: jest.fn()
};

let queryCalls = 0;

const charId = '00Ctest12345';

describe('DbSpellService', () => {
  let service: DbSpellService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DbSpellService,
        {
          provide: DbService,
          useValue: mockDb
        }
      ]
    }).compile();
    service = module.get<DbSpellService>(DbSpellService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should work for the getSpells query', async () => {
    mockDb.query.mockReturnValueOnce([
      new DbSpell(),
      new DbSpell(),
      new DbSpell()
    ]);
    const spells = await service.getSpells(charId);
    expect(mockDb.query).toBeCalledTimes(++queryCalls);
    expect(spells).toEqual([new DbSpell(), new DbSpell(), new DbSpell()]);
  });
  it('should work for the newSpell query', async () => {
    mockDb.query.mockReturnValueOnce([new DbSpell()]);
    const spells = await service.newSpell(new DbSpell(), charId);
    expect(
      mockDb.query.mock.calls[queryCalls][1][
        mockDb.query.mock.calls[queryCalls][1].length - 1
      ]
    ).toBe(charId);
    expect(mockDb.query).toBeCalledTimes(++queryCalls);
    expect(spells).toEqual(new DbSpell());
  });
  it('should work for the updateSpell query', async () => {
    mockDb.query.mockReturnValueOnce([new DbSpell()]);
    const spells = await service.updateSpell(new DbSpell());
    expect(mockDb.query).toBeCalledTimes(++queryCalls);
    expect(spells).toEqual(new DbSpell());
  });
});
