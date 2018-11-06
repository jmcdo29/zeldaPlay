import { Spell } from '#Models/spells';

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
  mySpell.damage = 1;
  expect(mySpell.damage).toBe(1);
  mySpell.diety = 'Farore';
  expect(mySpell.diety).toBe('Farore');
  mySpell.effect = 'a spell effect';
  expect(mySpell.effect).toBe('a spell effect');
  mySpell.id = 'spellId';
  expect(mySpell.id).toBe('spellId');
  mySpell.modifier = 'Wisdom';
  expect(mySpell.modifier).toBe('Wisdom');
  mySpell.mpUse = 100;
  expect(mySpell.mpUse).toBe(100);
  mySpell.multiplier = 3;
  expect(mySpell.multiplier).toBe(3);
  mySpell.name = 'test spell 3';
  expect(mySpell.name).toBe('test spell 3');
  mySpell.useDiety = false;
  expect(!mySpell.useDiety);
});
