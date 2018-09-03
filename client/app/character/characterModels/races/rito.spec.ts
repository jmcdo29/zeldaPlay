import { Rito } from './rito';

test('should create a Rito', () => {
  const myRito = new Rito();
  expect(myRito).toBeTruthy();
  expect(myRito.getRace()).toBe('Rito');
});
test('should create a Sharp Eye Rito', () => {
  const myRito = new Rito('Sharp Eye');
  expect(myRito).toBeTruthy();
  expect(myRito.getRace()).toBe('Rito');
  expect(myRito.getSubRace()).toBe('Sharp Eye');
  expect(myRito.getAttributes()[3].getValue()).toBe(9);
});
test('should create a Sharp Tongue Rito', () => {
  const myRito = new Rito('Sharp Tongue');
  expect(myRito).toBeTruthy();
  expect(myRito.getRace()).toBe('Rito');
  expect(myRito.getSubRace()).toBe('Sharp Tongue');
  expect(myRito.getAttributes()[5].getValue()).toBe(9);
});
