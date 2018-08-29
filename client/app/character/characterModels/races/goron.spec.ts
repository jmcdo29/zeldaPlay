import { Goron } from './goron';

test('should create a Goron', () => {
  const myGoron = new Goron();
  expect(myGoron).toBeTruthy();
  expect(myGoron.race).toBe('Goron');
});
test('should create a Rock Spine Goron', () => {
  const myGoron = new Goron('Rock Spine');
  expect(myGoron).toBeTruthy();
  expect(myGoron.race).toBe('Goron');
  expect(myGoron.attributes[0].value).toBe(10);
});
test('should create a Soft Belly Goron', () => {
  const myGoron = new Goron('Soft Belly');
  expect(myGoron).toBeTruthy();
  expect(myGoron.race).toBe('Goron');
  expect(myGoron.attributes[4].value).toBe(9);
});
