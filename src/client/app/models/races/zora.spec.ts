import { Zora } from './zora';

test('should create a Zora', () => {
  const myZora = new Zora();
  expect(myZora).toBeTruthy();
  expect(myZora.getRace()).toBe('Zora');
  expect(myZora.getAttributes()[1].getValue()).toBe(10);
});
test('should create a River Zora', () => {
  const myZora = new Zora('River');
  expect(myZora).toBeTruthy();
  expect(myZora.getRace()).toBe('Zora');
  expect(myZora.getSubRace()).toBe('River');
  expect(myZora.getAttributes()[1].getValue()).toBe(10);
  expect(myZora.getAttributes()[2].getValue()).toBe(6);
  expect(myZora.getAttributes()[3].getValue()).toBe(10);
});
test('should create a Ocean Zora', () => {
  const myZora = new Zora('Ocean');
  expect(myZora).toBeTruthy();
  expect(myZora.getRace()).toBe('Zora');
  expect(myZora.getSubRace()).toBe('Ocean');
  expect(myZora.getAttributes()[1].getValue()).toBe(10);
  expect(myZora.getAttributes()[0].getValue()).toBe(10);
  expect(myZora.getAttributes()[4].getValue()).toBe(6);
});
test('should create a Swamp Zora', () => {
  const myZora = new Zora('Swamp');
  expect(myZora).toBeTruthy();
  expect(myZora.getRace()).toBe('Zora');
  expect(myZora.getSubRace()).toBe('Swamp');
  expect(myZora.getAttributes()[1].getValue()).toBe(10);
  expect(myZora.getAttributes()[0].getValue()).toBe(6);
  expect(myZora.getAttributes()[2].getValue()).toBe(10);
});
