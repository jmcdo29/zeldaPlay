import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

import { CharacterService } from '@Character/character.service';
import { DbService } from '@Db/db.service';
import { DbCharacter, DbSave, DbSkill } from '@DbModel/index';

const repo = {
  query: jest.fn()
};

process.env.DUMMY_ID = 'DUMMY_ID';
let queryCalls = 0;
const userId = '00Utest123454';

const getMulti = (characters: any) => {
  expect(repo.query).toBeCalledTimes(++queryCalls);
  expect(characters).toEqual([
    new DbCharacter(),
    new DbCharacter(),
    new DbCharacter()
  ]);
};

describe('CharacterService', () => {
  let service: CharacterService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharacterService,
        {
          provide: DbService,
          useValue: repo
        }
      ]
    }).compile();
    service = module.get<CharacterService>(CharacterService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should work for getCharacters (not logged in)', () => {
    repo.query.mockReturnValueOnce(
      of([new DbCharacter(), new DbCharacter(), new DbCharacter()])
    );
    service.getAll().subscribe(getMulti);
  });
  it('should work for getCharacters (logged in)', () => {
    repo.query.mockReturnValueOnce(
      of([new DbCharacter(), new DbCharacter(), new DbCharacter()])
    );
    service.getUserChars(userId).subscribe(getMulti);
  });
  describe('getOne', () => {
    it('should work for get ONE character', () => {
      repo.query
        .mockReturnValueOnce(of([new DbCharacter()]))
        .mockReturnValueOnce(of([new DbSkill()]))
        .mockReturnValueOnce(of([new DbSave()]));
      queryCalls += 3;
      const expectedChar = new DbCharacter();
      expectedChar.skills = [new DbSkill()];
      expectedChar.saves = [new DbSave()];
      service.getOne('00Ctest12345').subscribe((character) => {
        expect(repo.query).toBeCalledTimes(queryCalls);
        expect(character).toEqual(expectedChar);
      });
    });
    it('should error if there are no characters to return', () => {
      repo.query
        .mockReturnValueOnce(of([]))
        .mockReturnValueOnce(of([]))
        .mockReturnValueOnce(of([]));
      queryCalls += 3;
      service.getOne('00Ctest12345').subscribe(
        (character) => {},
        (err) => {
          expect(repo.query).toBeCalledTimes(queryCalls);
          expect(err).toBeTruthy();
        }
      );
    });
  });
  it('should work for newCharacter', () => {
    repo.query
      .mockReturnValueOnce(of([new DbCharacter()]))
      .mockResolvedValueOnce(of([new DbSkill()]))
      .mockReturnValueOnce(of([new DbSave()]));
    queryCalls += 3;
    const insertChar = new DbCharacter();
    insertChar.skills = [new DbSkill()];
    insertChar.saves = [new DbSave()];
    service.newChar(insertChar, userId).subscribe((newChar) => {
      expect(repo.query).toBeCalledTimes(queryCalls);
      expect(newChar).toEqual(new DbCharacter());
    });
  });
  it('should work for updateCharacter', () => {
    repo.query.mockReturnValueOnce(of([])).mockReturnValueOnce(of([]));
    queryCalls += 2;
    const char = new DbCharacter();
    char.skills = [new DbSkill()];
    service.updateChar(char).subscribe((updateChar) => {
      expect(repo.query).toBeCalledTimes(queryCalls);
      expect(updateChar).toEqual(undefined);
    });
  });
});
