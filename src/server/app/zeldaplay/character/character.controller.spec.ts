import { CharacterController } from '@Character/character.controller';

const CharacterServiceStub = {};

describe('Characters Controller', () => {
  let characterController: CharacterController;
  beforeAll(async () => {
    characterController = new CharacterController(CharacterServiceStub as any);
  });
  it('should be defined', () => {
    expect(characterController).toBeDefined();
  });
});
