import { SpellController } from '@Character/spell/spell.controller';

const SpellServiceStub = {
  getSpell: () => {},
  newSpell: () => {},
  updateSpell: () => {}
};

describe('Spell Controller', () => {
  let spellController: SpellController;

  beforeAll(async () => {
    spellController = new SpellController(SpellServiceStub as any);
  });
  it('should be defined', () => {
    expect(spellController).toBeDefined();
  });
});
