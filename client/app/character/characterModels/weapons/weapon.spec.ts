import { Elemental } from './elemental';
import { Weapon } from './weapon';

test('should make a non ranged weapon', () => {
  const myWep = new Weapon();
  myWep.attack = 4;
  myWep.numberOfAttacks = 2;
  myWep.name = 'Test Weapon';
  myWep.modifier = 'Strength';
  myWep.range = 0;
  myWep.type = 'Short Sword';
  myWep.critDamage = 2;
  myWep.critRange = [18, 19, 20];
  expect(myWep).toBeTruthy();
});
test('should make a ranged weapon', () => {
  const myWep = new Weapon();
  myWep.attack = 4;
  myWep.numberOfAttacks = 2;
  myWep.name = 'Test Range Weapon';
  myWep.modifier = 'Dexterity';
  myWep.range = 30;
  myWep.type = 'Bow';
  myWep.critDamage = 2;
  myWep.critRange = [19, 20];
  myWep.ammo = 30;
  expect(myWep).toBeTruthy();
});
test('should make elemental weapon', () => {
  const myWep = new Weapon();
  myWep.attack = 4;
  myWep.numberOfAttacks = 2;
  myWep.name = 'Test Range Weapon';
  myWep.modifier = 'Dexterity';
  myWep.range = 30;
  myWep.type = 'Bow';
  myWep.critDamage = 2;
  myWep.critRange = [19, 20];
  myWep.ammo = 30;
  myWep.element = new Elemental();
  myWep.element.numberOfAttacks = 2;
  myWep.element.attack = 8;
  myWep.element.type = 'Fire';
  expect(myWep).toBeTruthy();
});
