import { Fairy } from '#Races/fairy';

test('should create a fairy', () => {
  const myFairy = new Fairy();
  checkSubRace(myFairy, '');
});
test('should create a fairy of Din', () => {
  const myFairy = new Fairy('Din');
  checkSubRace(myFairy, 'Din');
});
test('should create a fairy of Farore', () => {
  const myFairy = new Fairy('Farore');
  checkSubRace(myFairy, 'Farore');
});
test('should create a fairy of Nayru', () => {
  const myFairy = new Fairy('Nayru');
  checkSubRace(myFairy, 'Nayru');
});

function checkSubRace(currChar: Fairy, subRace: string): void {
  expect(currChar).toBeTruthy();
  expect(currChar.race).toBe('Fairy');
  expect(currChar.subRace).toBe(subRace);
  expect(currChar.attributes[0].value).toBe(6);
  expect(currChar.attributes[3].value).toBe(10);
  expect(currChar.attributes[4].value).toBe(10);
}
