import { Hylian } from './hylian';

test('should create a Hylian', () => {
  const myHylian = new Hylian();
  expect(myHylian).toBeTruthy();
  expect(myHylian.getRace()).toBe('Hylian');
});
test('should create a Hylian Farmer', () => {
  const myHylian = new Hylian('Farmer');
  expect(myHylian).toBeTruthy();
  expect(myHylian.getRace()).toBe('Hylian');
  expect(myHylian.getAttributes()[0].getValue()).toBe(10);
});
test('should create a Hylian Guard', () => {
  const myHylian = new Hylian('Guard');
  expect(myHylian).toBeTruthy();
  expect(myHylian.getRace()).toBe('Hylian');
  expect(myHylian.getAttributes()[2].getValue()).toBe(10);
});
test('should create a Hylian Sheikah', () => {
  const myHylian = new Hylian('Sheikah');
  expect(myHylian).toBeTruthy();
  expect(myHylian.getRace()).toBe('Hylian');
  expect(myHylian.getAttributes()[1].getValue()).toBe(10);
});
