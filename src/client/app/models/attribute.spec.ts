import { Attribute } from '#Models/attribute';

test('make a new attribute with even value', () => {
  const myAtt = new Attribute('Strength', 20);
  expect(myAtt).toBeTruthy();
  expect(myAtt.name).toBe('Strength');
  expect(myAtt.value).toBe(20);
  expect(myAtt.modifier).toBe(5);
});
test('make a new attribute with odd value', () => {
  const myAtt = new Attribute('Dexterity', 19);
  expect(myAtt).toBeTruthy();
  expect(myAtt.name).toBe('Dexterity');
  expect(myAtt.value).toBe(19);
  expect(myAtt.modifier).toBe(4);

  // getters and setters
  myAtt.name = 'Strength';
  expect(myAtt.name).toBe('Strength');
  myAtt.value = 21;
  expect(myAtt.value).toBe(21);
  expect(myAtt.modifier).toBe(5);
  myAtt.changeValue(3);
  expect(myAtt.value).toBe(24);
  expect(myAtt.modifier).toBe(7);
});
