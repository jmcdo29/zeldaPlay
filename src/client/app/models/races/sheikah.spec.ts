import { Sheikah } from '#Races/sheikah';

test('should create a sheikah', () => {
  const mySheikah = new Sheikah();
  expect(mySheikah).toBeTruthy();
  expect(mySheikah.getRace()).toBe('Sheikah');
  expect(mySheikah.getAttributes()[1].getValue()).toBe(10);
  expect(mySheikah.getAttributes()[2].getValue()).toBe(10);
  expect(mySheikah.getAttributes()[5].getValue()).toBe(6);
});
