import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

import { DbService } from '@Db/db.service';
import { DbCharacter, DbSave, DbSkill } from '@Db/models';
import { DbCharacterService } from './db-character.service';

const mockDb = {
  query: jest.fn()
};

let queryCalls = 0;
const charId = '00Ctest12345';

describe('DbCharacterService', () => {
  let service: DbCharacterService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DbCharacterService,
        {
          provide: DbService,
          useValue: mockDb
        }
      ]
    }).compile();
    service = module.get<DbCharacterService>(DbCharacterService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should run queryCharacters', () => {
    mockDb.query.mockReturnValueOnce(
      of([new DbCharacter(), new DbCharacter(), new DbCharacter()])
    );
    service.queryCharacters('00Utest12345').subscribe((characters) => {
      expect(mockDb.query.mock.calls[queryCalls][1][0]).toBe('00Utest12345');
      expect(mockDb.query).toBeCalledTimes(++queryCalls);
      expect(characters).toEqual([
        new DbCharacter(),
        new DbCharacter(),
        new DbCharacter()
      ]);
    });
  });
  it('should run queryCharactersOne', () => {
    mockDb.query
      .mockReturnValueOnce(of([new DbCharacter()]))
      .mockReturnValueOnce(of([new DbSkill()]))
      .mockReturnValueOnce(of([new DbSave()]));
    service.queryCharacterOne(charId).subscribe((character) => {
      expect(mockDb.query.mock.calls[queryCalls][1][0]).toBe(charId);
      expect(mockDb.query.mock.calls[queryCalls + 1][1][0]).toBe(charId);
      expect(mockDb.query.mock.calls[queryCalls + 2][1][0]).toBe(charId);
      queryCalls += 3;
      expect(mockDb.query).toBeCalledTimes(queryCalls);
      expect(character).toBeTruthy();
      expect(character.skills).toBeTruthy();
      expect(character.saves).toBeTruthy();
    });
  });
  it('should run queryCharactersOne and find nothing', () => {
    mockDb.query
      .mockReturnValueOnce(of([]))
      .mockReturnValueOnce(of([]))
      .mockReturnValueOnce(of([]));
    queryCalls += 3;
    service.queryCharacterOne(charId).subscribe(
      () => {
        throw new Error('Should not be here');
      },
      (err) => expect(err.message.message).toBe('No character found')
    );
  });
  it('should run insertNewCharacter', () => {
    const newChar = new DbCharacter();
    newChar.skills = [new DbSkill()];
    newChar.saves = [new DbSave()];
    mockDb.query
      .mockReturnValueOnce(of([newChar]))
      .mockReturnValueOnce(of([newChar.skills]))
      .mockReturnValueOnce(of([newChar.saves]));
    service
      .insertNewCharacter(newChar, '00Utest12345')
      .subscribe((character) => {
        expect(
          mockDb.query.mock.calls[queryCalls][1][
            mockDb.query.mock.calls[queryCalls][1].length - 1
          ]
        ).toBe('00Utest12345');
        queryCalls += 3;
        expect(mockDb.query).toBeCalledTimes(queryCalls);
        expect(character).toEqual(newChar);
      });
  });
  it('shoudl run updateCharacter', () => {
    mockDb.query.mockReturnValueOnce(of([new DbCharacter()]));
    service.updateCharacter(new DbCharacter()).subscribe((updateChar) => {
      expect(mockDb.query).toBeCalledTimes(++queryCalls);
      expect(updateChar).toEqual(new DbCharacter());
    });
  });
  it('should run updateSkills', () => {
    mockDb.query.mockReturnValueOnce(of([new DbSkill(), new DbSkill()]));
    service
      .updateSkills([new DbSkill(), new DbSkill()], charId)
      .subscribe((skills) => {
        expect(mockDb.query).toBeCalledTimes(++queryCalls);
        expect(skills.length).toBe(2);
      });
  });
});
