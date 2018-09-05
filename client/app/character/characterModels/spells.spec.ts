import { Spell } from './spells';

test('should make a spell', () => {
  const mySpell = new Spell(
    '0Splkajsdf',
    'Test Spell',
    'what it does',
    5,
    4,
    5,
    'Din',
    true,
    'Intelligence'
  );
  expect(mySpell).toBeTruthy();

  // getters and setters
  mySpell.setDamage(1);
  expect(mySpell.getDamage()).toBe(1);
  mySpell.setDiety('Farore');
  expect(mySpell.getDiety()).toBe('Farore');
  mySpell.setEffect('a spell effect');
  expect(mySpell.getEffect()).toBe('a spell effect');
  mySpell.setId('spellId');
  expect(mySpell.getId()).toBe('spellId');
  mySpell.setModifier('Wisdom');
  expect(mySpell.getModifier()).toBe('Wisdom');
  mySpell.setMpUse(100);
  expect(mySpell.getMpUse()).toBe(100);
  mySpell.setMultiplier(3);
  expect(mySpell.getMultiplier()).toBe(3);
  mySpell.setName('test spell 3');
  expect(mySpell.getName()).toBe('test spell 3');
  mySpell.setUseDiety(false);
  expect(!mySpell.getUseDiety());
});
