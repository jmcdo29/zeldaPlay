import { Fairy } from './fairy';

test('should create a fairy', () => {
  const myFairy = new Fairy();
  expect(myFairy).toBeTruthy();
  expect(myFairy.getRace()).toBe('Fairy');
  expect(myFairy.getAttributes()[0].getValue()).toBe(6);
  expect(myFairy.getAttributes()[3].getValue()).toBe(10);
  expect(myFairy.getAttributes()[4].getValue()).toBe(10);
});
test('should create a fairy of Din', () => {
  const myFairy = new Fairy('Din');
  expect(myFairy).toBeTruthy();
  expect(myFairy.getRace()).toBe('Fairy');
  expect(myFairy.getAttributes()[0].getValue()).toBe(6);
  expect(myFairy.getAttributes()[3].getValue()).toBe(10);
  expect(myFairy.getAttributes()[4].getValue()).toBe(10);
});
test('should create a fairy of Farore', () => {
  const myFairy = new Fairy('Farore');
  expect(myFairy).toBeTruthy();
  expect(myFairy.getRace()).toBe('Fairy');
  expect(myFairy.getAttributes()[0].getValue()).toBe(6);
  expect(myFairy.getAttributes()[3].getValue()).toBe(10);
  expect(myFairy.getAttributes()[4].getValue()).toBe(10);
});
test('should create a fairy of Nayru', () => {
  const myFairy = new Fairy('Nayru');
  expect(myFairy).toBeTruthy();
  expect(myFairy.getRace()).toBe('Fairy');
  expect(myFairy.getAttributes()[0].getValue()).toBe(6);
  expect(myFairy.getAttributes()[3].getValue()).toBe(10);
  expect(myFairy.getAttributes()[4].getValue()).toBe(10);
});
