import { SpellModule } from './spell.module';

describe('SpellModule', () => {
  let spellModule: SpellModule;

  beforeEach(() => {
    spellModule = new SpellModule();
  });

  it('should create an instance', () => {
    expect(spellModule).toBeTruthy();
  });
});
