import { Goron } from '#Races/goron';

test('should create a Goron', () => {
  const myGoron = new Goron();
  expect(myGoron).toBeTruthy();
  expect(myGoron.getRace()).toBe('Goron');
});
test('should create a Rock Spine Goron', () => {
  const myGoron = new Goron('Rock Spine');
  expect(myGoron).toBeTruthy();
  expect(myGoron.getRace()).toBe('Goron');
  expect(myGoron.getAttributes()[0].getValue()).toBe(10);
});
test('should create a Soft Belly Goron', () => {
  const myGoron = new Goron('Soft Belly');
  expect(myGoron).toBeTruthy();
  expect(myGoron.getRace()).toBe('Goron');
  expect(myGoron.getAttributes()[4].getValue()).toBe(9);
});
