import { Hylian } from './hylian';

test('should create a Hylian', () => {
  const myHylian = new Hylian();
  expect(myHylian).toBeTruthy();
  expect(myHylian.race).toBe('Hylian');
});
test('should create a Hylian Farmer', () => {
  const myHylian = new Hylian('Farmer');
  expect(myHylian).toBeTruthy();
  expect(myHylian.race).toBe('Hylian');
  expect(myHylian.attributes[0].value).toBe(10);
});
test('should create a Hylian Guard', () => {
  const myHylian = new Hylian('Guard');
  expect(myHylian).toBeTruthy();
  expect(myHylian.race).toBe('Hylian');
  expect(myHylian.attributes[2].value).toBe(10);
});
test('should create a Hylian Sheikah', () => {
  const myHylian = new Hylian('Sheikah');
  expect(myHylian).toBeTruthy();
  expect(myHylian.race).toBe('Hylian');
  expect(myHylian.attributes[1].value).toBe(10);
});
