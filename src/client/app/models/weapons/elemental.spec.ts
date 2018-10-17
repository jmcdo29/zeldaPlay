import { Elemental } from '#Models/weapons/elemental';

test('should make a lighting element', () => {
  const myElem = new Elemental('elemId', 'Lightning', 8, 4);
  expect(myElem).toBeTruthy();
  expect(myElem.getId()).toBe('elemId');
  expect(myElem.getAttack()).toBe(8);
  expect(myElem.getNOfA()).toBe(4);
  expect(myElem.getType()).toBe('Lightning');

  // getters and setters

  myElem.setAttack(4);
  expect(myElem.getAttack()).toBe(4);
  myElem.setNOfA(2);
  expect(myElem.getNOfA()).toBe(2);
  myElem.setType('Fire');
  expect(myElem.getType()).toBe('Fire');
  myElem.setId('elemId2');
  expect(myElem.getId()).toBe('elemId2');
});
