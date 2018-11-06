import { Elemental } from '#Models/weapons/elemental';
import { Weapon } from '#Models/weapons/weapon';

test('should make a weapon', () => {
  const myWep = new Weapon(
    'weaponId',
    'Test Weapon',
    4,
    2,
    [18, 19, 20],
    2,
    'Short Sword',
    'Strength',
    0
  );
  expect(myWep.attack).toBe(4);
  expect(myWep.numberOfAttacks).toBe(2);
  expect(myWep.name).toBe('Test Weapon');
  expect(myWep.modifier).toBe('Strength');
  expect(myWep.range).toBe(0);
  expect(myWep.type).toBe('Short Sword');
  expect(myWep.critDamage).toBe(2);
  expect(myWep.critRange).toEqual([18, 19, 20]);
  expect(myWep.id).toBe('weaponId');
  expect(myWep).toBeTruthy();

  // getters setters
  myWep.id = 'weaponId2';
  expect(myWep.id).toBe('weaponId2');
  myWep.attack = 3;
  expect(myWep.attack).toBe(3);
  myWep.numberOfAttacks = 3;
  expect(myWep.numberOfAttacks).toBe(3);
  myWep.ammo = 30;
  expect(myWep.ammo).toBe(30);
  myWep.critDamage = 4;
  expect(myWep.critDamage).toBe(4);
  myWep.critRange = [19, 20];
  expect(myWep.critRange).toEqual([19, 20]);
  myWep.element = new Elemental('elemId', 'Fire', 4, 4);
  expect(myWep.element).toBeTruthy();
  myWep.modifier = 'Dexterity';
  expect(myWep.modifier).toBe('Dexterity');
  myWep.name = 'A new name';
  expect(myWep.name).toBe('A new name');
  myWep.range = 70;
  expect(myWep.range).toBe(70);
  myWep.type = 'Bow';
  expect(myWep.type).toBe('Bow');
});
