import { Elemental } from '#Models/weapons/elemental';

test('should make a lighting element', () => {
  const myElem = new Elemental('elemId', 'Lightning', 8, 4);
  expect(myElem).toBeTruthy();
  expect(myElem.id).toBe('elemId');
  expect(myElem.attack).toBe(8);
  expect(myElem.numberOfAttacks).toBe(4);
  expect(myElem.type).toBe('Lightning');

  // getters and setters

  myElem.attack = 4;
  expect(myElem.attack).toBe(4);
  myElem.numberOfAttacks = 2;
  expect(myElem.numberOfAttacks).toBe(2);
  myElem.type = 'Fire';
  expect(myElem.type).toBe('Fire');
  myElem.id = 'elemId2';
  expect(myElem.id).toBe('elemId2');
});
