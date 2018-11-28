import { Attributes } from '#Enums/attributes.enum';
import { Zora } from '#Races/zora';

const zora = 'Zora';

test('should create a Zora', () => {
  const myZora = new Zora();
  expect(myZora).toBeTruthy();
  expect(myZora.race).toBe(zora);
  expect(myZora.attributes[1].value).toBe(10);
});
test('should create a River Zora', () =>
  subRaceTest(
    'River',
    { name: 'Constitution', value: 6 },
    { name: 'Intelligence', value: 10 }
  ));
test('should create a Ocean Zora', () =>
  subRaceTest(
    'Ocean',
    { name: 'Strength', value: 10 },
    { name: 'Wisdom', value: 6 }
  ));
test('should create a Swamp Zora', () =>
  subRaceTest(
    'Swamp',
    { name: 'Strength', value: 6 },
    { name: 'Constitution', value: 10 }
  ));

function subRaceTest(
  subRace: string,
  attribute1: { name: string; value: number },
  attribute2: { name: string; value: number }
): any {
  const myZora = new Zora(subRace);
  expect(myZora).toBeTruthy();
  expect(myZora.race).toBe(zora);
  expect(myZora.subRace).toBe(subRace);
  expect(myZora.attributes[1].value).toBe(10);
  expect(myZora.attributes[Attributes[attribute1.name]].value).toBe(
    attribute1.value
  );
  expect(myZora.attributes[Attributes[attribute2.name]].value).toBe(
    attribute2.value
  );
}
