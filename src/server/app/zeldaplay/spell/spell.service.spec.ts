import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

import { DbService } from '@Db/db.service';
import { DbSpell } from '@DbModel/index';
import { SpellService } from '@Spell/spell.service';

const mockRepo = {
  query: jest.fn()
};

const charId = '00Ctest12345';
let queryCalls = 0;

describe('SpellService', () => {
  let service: SpellService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpellService,
        {
          provide: DbService,
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
    mockRepo.query.mockReturnValue(
      of([new DbSpell(), new DbSpell(), new DbSpell()])
    );
    service.getSpells(charId).subscribe((spells) => {
      expect(mockRepo.query).toBeCalledTimes(++queryCalls);
      expect(spells).toEqual([new DbSpell(), new DbSpell(), new DbSpell()]);
    });
  });
  it('should call newSpell()', () => {
    mockRepo.query.mockReturnValue(of([new DbSpell()]));
    service.newSpell(new DbSpell(), charId).subscribe((newSpell) => {
      expect(mockRepo.query).toBeCalledTimes(++queryCalls);
      expect(newSpell).toEqual(new DbSpell());
    });
  });
  it('should call updateSpell()', () => {
    mockRepo.query.mockReturnValue(of([new DbSpell()]));
    service.updateSpell(new DbSpell()).subscribe((updatedSpell) => {
      expect(mockRepo.query).toBeCalledTimes(++queryCalls);
      expect(updatedSpell).toEqual(new DbSpell());
    });
  });
});
