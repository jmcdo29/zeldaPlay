import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

import { CharacterService } from '@Character/character.service';
import { DbCharacter } from '@DbModel/index';
import { DbCharacterService } from './db-character/db-character.service';

const repo = {
  queryCharacters: jest
    .fn()
    .mockReturnValue(
      of([new DbCharacter(), new DbCharacter(), new DbCharacter()])
    ),
  queryCharacterOne: jest.fn().mockReturnValue(of(new DbCharacter())),
  insertNewCharacter: jest.fn().mockReturnValue(of(new DbCharacter())),
  updateCharacter: jest.fn().mockReturnValue(of([])),
  updateSkills: jest.fn().mockReturnValue(of([]))
};

process.env.DUMMY_ID = 'DUMMY_ID';
let queryCharCalls = 0;
const userId = '00Utest123454';

describe('CharacterService', () => {
  let service: CharacterService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharacterService,
        {
          provide: DbCharacterService,
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
    service.getAll().subscribe((characters) => {
      expect(repo.queryCharacters).toBeCalledWith('DUMMY_ID');
      expect(repo.queryCharacters).toBeCalledTimes(++queryCharCalls);
      expect(characters).toEqual([
        new DbCharacter(),
        new DbCharacter(),
        new DbCharacter()
      ]);
    });
  });
  it('should work for getCharacters (logged in)', () => {
    service.getUserChars(userId).subscribe((characters) => {
      expect(repo.queryCharacters).toBeCalledWith(userId);
      expect(repo.queryCharacters).toBeCalledTimes(++queryCharCalls);
      expect(characters).toEqual([
        new DbCharacter(),
        new DbCharacter(),
        new DbCharacter()
      ]);
    });
  });
  it('should work for get ONE character', () => {
    service.getOne('00Ctest12345').subscribe((character) => {
      expect(repo.queryCharacterOne).toBeCalledTimes(1);
      expect(repo.queryCharacterOne).toBeCalledWith('00Ctest12345');
      expect(character).toEqual(new DbCharacter());
    });
  });
  it('should work for newCharacter', () => {
    service.newChar(new DbCharacter(), userId).subscribe((newChar) => {
      expect(repo.insertNewCharacter).toBeCalledTimes(1);
      expect(repo.insertNewCharacter).toBeCalledWith(new DbCharacter(), userId);
      expect(newChar).toEqual(new DbCharacter());
    });
  });
  it('should work for updateCharacter', () => {
    service.updateChar(new DbCharacter()).subscribe((updateChar) => {
      expect(repo.updateCharacter).toBeCalledTimes(1);
      expect(repo.updateCharacter).toBeCalledWith(new DbCharacter());
      expect(repo.updateSkills).toBeCalledTimes(1);
      expect(updateChar).toEqual([]);
    });
  });
});
