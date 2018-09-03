import { Elemental } from './elemental';
import { Weapon } from './weapon';

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
  expect(myWep.getAttack()).toBe(4);
  expect(myWep.getNOfA()).toBe(2);
  expect(myWep.getName()).toBe('Test Weapon');
  expect(myWep.getModifier()).toBe('Strength');
  expect(myWep.getRange()).toBe(0);
  expect(myWep.getType()).toBe('Short Sword');
  expect(myWep.getCritDamage()).toBe(2);
  expect(myWep.getCritRange()).toEqual([18, 19, 20]);
  expect(myWep.getId()).toBe('weaponId');
  expect(myWep).toBeTruthy();

  // getters setters
  myWep.setId('weaponId2');
  expect(myWep.getId()).toBe('weaponId2');
  myWep.setAttack(3);
  expect(myWep.getAttack()).toBe(3);
  myWep.setNOfA(3);
  expect(myWep.getNOfA()).toBe(3);
  myWep.setAmmo(30);
  expect(myWep.getAmmo()).toBe(30);
  myWep.setCritDamage(4);
  expect(myWep.getCritDamage()).toBe(4);
  myWep.setCritRange([19, 20]);
  expect(myWep.getCritRange()).toEqual([19, 20]);
  myWep.setElement(new Elemental('elemId', 'Fire', 4, 4));
  expect(myWep.getElement()).toBeTruthy();
  myWep.setModifier('Dexterity');
  expect(myWep.getModifier()).toBe('Dexterity');
  myWep.setName('A new name');
  expect(myWep.getName()).toBe('A new name');
  myWep.setRange(70);
  expect(myWep.getRange()).toBe(70);
  myWep.setType('Bow');
  expect(myWep.getType()).toBe('Bow');
});
