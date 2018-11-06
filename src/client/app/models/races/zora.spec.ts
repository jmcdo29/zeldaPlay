import { Zora } from '#Races/zora';

test('should create a Zora', () => {
  const myZora = new Zora();
  expect(myZora).toBeTruthy();
  expect(myZora.race).toBe('Zora');
  expect(myZora.attributes[1].value).toBe(10);
});
test('should create a River Zora', () => {
  const myZora = new Zora('River');
  expect(myZora).toBeTruthy();
  expect(myZora.race).toBe('Zora');
  expect(myZora.subRace).toBe('River');
  expect(myZora.attributes[1].value).toBe(10);
  expect(myZora.attributes[2].value).toBe(6);
  expect(myZora.attributes[3].value).toBe(10);
});
test('should create a Ocean Zora', () => {
  const myZora = new Zora('Ocean');
  expect(myZora).toBeTruthy();
  expect(myZora.race).toBe('Zora');
  expect(myZora.subRace).toBe('Ocean');
  expect(myZora.attributes[1].value).toBe(10);
  expect(myZora.attributes[0].value).toBe(10);
  expect(myZora.attributes[4].value).toBe(6);
});
test('should create a Swamp Zora', () => {
  const myZora = new Zora('Swamp');
  expect(myZora).toBeTruthy();
  expect(myZora.race).toBe('Zora');
  expect(myZora.subRace).toBe('Swamp');
  expect(myZora.attributes[1].value).toBe(10);
  expect(myZora.attributes[0].value).toBe(6);
  expect(myZora.attributes[2].value).toBe(10);
});
