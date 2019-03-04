import { Test, TestingModule } from '@nestjs/testing';

import { CharacterService } from '@Character/character.service';
import { DbCharacterService } from './db-character/db-character.service';
import { DbCharacter } from '@DbModel/index';

const repo = {
  queryCharacters: jest
    .fn()
    .mockReturnValue([new DbCharacter(), new DbCharacter(), new DbCharacter()]),
  queryCharacterOne: jest.fn().mockReturnValue(new DbCharacter()),
  insertNewCharacter: jest.fn().mockReturnValue(new DbCharacter()),
  updateCharacter: jest.fn(),
  updateSkills: jest.fn()
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
  it('should work for getCharacters (not logged in)', async () => {
    const characters = await service.getAll();
    expect(repo.queryCharacters).toBeCalledWith('DUMMY_ID');
    expect(repo.queryCharacters).toBeCalledTimes(++queryCharCalls);
    expect(characters).toEqual([
      new DbCharacter(),
      new DbCharacter(),
      new DbCharacter()
    ]);
  });
  it('should work for getCharacters (logged in)', async () => {
    const characters = await service.getUserChars(userId);
    expect(repo.queryCharacters).toBeCalledWith(userId);
    expect(repo.queryCharacters).toBeCalledTimes(++queryCharCalls);
    expect(characters).toEqual([
      new DbCharacter(),
      new DbCharacter(),
      new DbCharacter()
    ]);
  });
  it('should work for get ONE character', async () => {
    const character = await service.getOne('00Ctest12345');
    expect(repo.queryCharacterOne).toBeCalledTimes(1);
    expect(repo.queryCharacterOne).toBeCalledWith('00Ctest12345');
    expect(character).toEqual(new DbCharacter());
  });
  it('should work for newCharacter', async () => {
    const newChar = await service.newChar(new DbCharacter(), userId);
    expect(repo.insertNewCharacter).toBeCalledTimes(1);
    expect(repo.insertNewCharacter).toBeCalledWith(new DbCharacter(), userId);
    expect(newChar).toEqual(new DbCharacter());
  });
  it('should work for updateCharacter', async () => {
    const updateChar = await service.updateChar(new DbCharacter());
    expect(repo.updateCharacter).toBeCalledTimes(1);
    expect(repo.updateCharacter).toBeCalledWith(new DbCharacter());
    expect(repo.updateSkills).toBeCalledTimes(1);
    expect(updateChar).toEqual(new DbCharacter());
  });
});
