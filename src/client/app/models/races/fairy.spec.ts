import { Fairy } from '#Races/fairy';

test('should create a fairy', () => {
  const myFairy = new Fairy();
  expect(myFairy).toBeTruthy();
  expect(myFairy.race).toBe('Fairy');
  expect(myFairy.attributes[0].value).toBe(6);
  expect(myFairy.attributes[3].value).toBe(10);
  expect(myFairy.attributes[4].value).toBe(10);
});
test('should create a fairy of Din', () => {
  const myFairy = new Fairy('Din');
  expect(myFairy).toBeTruthy();
  expect(myFairy.race).toBe('Fairy');
  expect(myFairy.attributes[0].value).toBe(6);
  expect(myFairy.attributes[3].value).toBe(10);
  expect(myFairy.attributes[4].value).toBe(10);
});
test('should create a fairy of Farore', () => {
  const myFairy = new Fairy('Farore');
  expect(myFairy).toBeTruthy();
  expect(myFairy.race).toBe('Fairy');
  expect(myFairy.attributes[0].value).toBe(6);
  expect(myFairy.attributes[3].value).toBe(10);
  expect(myFairy.attributes[4].value).toBe(10);
});
test('should create a fairy of Nayru', () => {
  const myFairy = new Fairy('Nayru');
  expect(myFairy).toBeTruthy();
  expect(myFairy.race).toBe('Fairy');
  expect(myFairy.attributes[0].value).toBe(6);
  expect(myFairy.attributes[3].value).toBe(10);
  expect(myFairy.attributes[4].value).toBe(10);
});
