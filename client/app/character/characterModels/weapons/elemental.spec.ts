import { Elemental } from './elemental';

test('should make a lighting element', () => {
  const myElem = new Elemental();
  myElem.type = 'Lighting';
  myElem.numberOfAttacks = 4;
  myElem.attack = 8;
  expect(myElem).toBeTruthy();
});
