import { Rito } from '#Races/rito';

test('should create a Rito', () => {
  const myRito = new Rito();
  expect(myRito).toBeTruthy();
  expect(myRito.race).toBe('Rito');
});
test('should create a Sharp Eye Rito', () => {
  const myRito = new Rito('Sharp Eye');
  expect(myRito).toBeTruthy();
  expect(myRito.race).toBe('Rito');
  expect(myRito.subRace).toBe('Sharp Eye');
  expect(myRito.attributes[3].value).toBe(9);
});
test('should create a Sharp Tongue Rito', () => {
  const myRito = new Rito('Sharp Tongue');
  expect(myRito).toBeTruthy();
  expect(myRito.race).toBe('Rito');
  expect(myRito.subRace).toBe('Sharp Tongue');
  expect(myRito.attributes[5].value).toBe(9);
});
