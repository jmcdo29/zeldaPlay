import { Sheikah } from './sheikah';

test('should create a sheikah', () => {
  const mySheikah = new Sheikah();
  expect(mySheikah).toBeTruthy();
  expect(mySheikah.race).toBe('Sheikah');
  expect(mySheikah.attributes[1].value).toBe(10);
  expect(mySheikah.attributes[2].value).toBe(10);
  expect(mySheikah.attributes[5].value).toBe(6);
});
