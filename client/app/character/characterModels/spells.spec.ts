import { Spell } from './spells';

test('should make a spell', () => {
  const mySpell = new Spell();
  mySpell.name = 'Test Spell';
  mySpell.effect = 'what it does';
  mySpell.damage = 5;
  mySpell.multiplier = 4;
  mySpell.mpUse = 5;
  mySpell.diety = 'Din';
  mySpell.useDiety = true;
  mySpell.modifier = 'Intelligence';
  mySpell.id = '0Splkajsdf';
  expect(mySpell).toBeTruthy();
});
