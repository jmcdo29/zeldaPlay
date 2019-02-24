import { CharacterController } from '@Character/character.controller';
import { DbCharacter } from '@Db/models/db_character.model';

const CharacterServiceStub = {
  getAll: jest
    .fn()
    .mockReturnValue([new DbCharacter(), new DbCharacter(), new DbCharacter()]),
  newChar: jest.fn().mockReturnValue(new DbCharacter()),
  getUserChars: jest
    .fn()
    .mockReturnValue([new DbCharacter(), new DbCharacter(), new DbCharacter()]),
  getOne: jest.fn().mockReturnValue(new DbCharacter()),
  updateChar: jest.fn().mockReturnValue(new DbCharacter())
};

describe('Characters Controller', () => {
  let characterController: CharacterController;
  beforeAll(async () => {
    characterController = new CharacterController(CharacterServiceStub as any);
  });
  it('should be defined', () => {
    expect(characterController).toBeDefined();
  });
  it('should work for getAll', async () => {
    const characters = await characterController.getAll();
    expect(characters).toEqual([
      new DbCharacter(),
      new DbCharacter(),
      new DbCharacter()
    ]);
  });
  it('should work for getUserChars', async () => {
    const characters = await characterController.getUser({
      userId: '00Utest12345'
    });
    expect(characters).toEqual([
      new DbCharacter(),
      new DbCharacter(),
      new DbCharacter()
    ]);
  });
  it('should work for getOne', async () => {
    const character = await characterController.getOne({
      charId: '00Ctest12345'
    });
    expect(character).toEqual(new DbCharacter());
  });
  it('should work for newChar', async () => {
    const character = await characterController.newChar(
      { userId: '00Utest12345' },
      new DbCharacter()
    );
    expect(character).toEqual(new DbCharacter());
  });
  it('should work for updateChar', async () => {
    const character = await characterController.updateOne(
      { charId: '' },
      new DbCharacter()
    );
    expect(character).toEqual(new DbCharacter());
  });
});
