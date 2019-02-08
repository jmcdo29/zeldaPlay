import { Test, TestingModule } from '@nestjs/testing';
import { DbCharacterService } from './db-character.service';
import { DbService } from '@Db/db.service';
import { DbCharacter } from '@Db/models/db_character.model';
import { DbSkill } from '@Db/models/db_skill.model';
import { DbSave } from '@Db/models/db_save.model';

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
  it('should run queryCharacters', async () => {
    mockDb.query.mockReturnValueOnce([
      new DbCharacter(),
      new DbCharacter(),
      new DbCharacter()
    ]);
    const characters = await service.queryCharacters('00Utest12345');
    expect(mockDb.query.mock.calls[queryCalls][1][0]).toBe('00Utest12345');
    expect(mockDb.query).toBeCalledTimes(++queryCalls);
    expect(characters).toEqual([
      new DbCharacter(),
      new DbCharacter(),
      new DbCharacter()
    ]);
  });
  it('should run queryCharactersOne', async () => {
    mockDb.query
      .mockReturnValueOnce([new DbCharacter()])
      .mockReturnValueOnce([new DbSkill()])
      .mockReturnValueOnce([new DbSave()]);
    const character = await service.queryCharacterOne(charId);
    expect(mockDb.query.mock.calls[queryCalls][1][0]).toBe(charId);
    expect(mockDb.query.mock.calls[queryCalls + 1][1][0]).toBe(charId);
    expect(mockDb.query.mock.calls[queryCalls + 2][1][0]).toBe(charId);
    queryCalls += 3;
    expect(mockDb.query).toBeCalledTimes(queryCalls);
    expect(character).toBeTruthy();
    expect(character.skills).toBeTruthy();
    expect(character.saves).toBeTruthy();
  });
  it('should run queryCharactersOne and find nothing', async () => {
    mockDb.query.mockReturnValueOnce([]);
    try {
      queryCalls += 1;
      await service.queryCharacterOne(charId);
    } catch (err) {
      expect(err.message.message).toBe('No character found');
    }
  });
  it('should run insertNewCharacter', async () => {
    const newChar = new DbCharacter();
    newChar.skills = [];
    newChar.saves = [];
    mockDb.query.mockReturnValueOnce([newChar]);
    const character = await service.insertNewCharacter(newChar, '00Utest12345');
    expect(
      mockDb.query.mock.calls[queryCalls][1][
        mockDb.query.mock.calls[queryCalls][1].length - 1
      ]
    ).toBe('00Utest12345');
    queryCalls += 3;
    expect(mockDb.query).toBeCalledTimes(queryCalls);
    expect(character).toEqual(newChar);
  });
  it('shoudl run updateCharacter', async () => {
    mockDb.query.mockReturnValueOnce([new DbCharacter()]);
    const updateChar = await service.updateCharacter(new DbCharacter());
    expect(mockDb.query).toBeCalledTimes(++queryCalls);
    expect(updateChar).toEqual(new DbCharacter());
  });
  it('should run updateSkills', async () => {
    mockDb.query.mockReturnValueOnce([new DbSkill(), new DbSkill()]);
    const skills = await service.updateSkills(
      [new DbSkill(), new DbSkill()],
      charId
    );
    expect(mockDb.query).toBeCalledTimes(++queryCalls);
    expect(skills.length).toBe(2);
  });
});
