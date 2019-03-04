import { SpellController } from '@Spell/spell.controller';
import { DbSpell } from '@DbModel/index';

const SpellServiceStub = {
  getSpells: jest
    .fn()
    .mockReturnValue([new DbSpell(), new DbSpell(), new DbSpell()]),
  newSpell: jest.fn().mockReturnValue(new DbSpell()),
  updateSpell: jest.fn().mockReturnValue(new DbSpell())
};

const charId = '00Ctest12345';

describe('Spell Controller', () => {
  let spellController: SpellController;

  beforeAll(async () => {
    spellController = new SpellController(SpellServiceStub as any);
  });
  it('should be defined', () => {
    expect(spellController).toBeDefined();
  });
  it('should work for the getSpells route', async () => {
    const spells = await spellController.getSpells({ charId });
    expect(SpellServiceStub.getSpells).toBeCalledTimes(1);
    expect(SpellServiceStub.getSpells).toBeCalledWith(charId);
    expect(spells.length).toBe(3);
    expect(spells).toEqual([new DbSpell(), new DbSpell(), new DbSpell()]);
  });
  it('should work for the newSpell route', async () => {
    const newSpell = await spellController.newSpell(new DbSpell(), { charId });
    expect(SpellServiceStub.newSpell).toBeCalledTimes(1);
    expect(SpellServiceStub.newSpell).toBeCalledWith(new DbSpell(), charId);
    expect(newSpell).toEqual(new DbSpell());
  });
  it('should work for the updateSpell route', async () => {
    const updatedSpell = await spellController.updateSpell(new DbSpell(), {
      spellId: '0Spwmu7JnWil'
    });
    expect(SpellServiceStub.updateSpell).toBeCalledTimes(1);
    expect(SpellServiceStub.updateSpell).toBeCalledWith(new DbSpell());
    expect(updatedSpell).toEqual(new DbSpell());
  });
});
