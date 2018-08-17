import { CharacterModule } from './character.module';

describe('CharacterModule', () => {
  let characterModule: CharacterModule;

  beforeEach(() => {
    characterModule = new CharacterModule();
  });

  it('should create an instance', () => {
    expect(characterModule).toBeTruthy();
  });
});
