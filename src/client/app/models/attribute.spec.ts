import { Attribute } from './attribute';

test('make a new attribute with even value', () => {
  const myAtt = new Attribute('Strength', 20);
  expect(myAtt).toBeTruthy();
  expect(myAtt.getName()).toBe('Strength');
  expect(myAtt.getValue()).toBe(20);
  expect(myAtt.getModifier()).toBe(5);
});
test('make a new attribute with odd value', () => {
  const myAtt = new Attribute('Dexterity', 19);
  expect(myAtt).toBeTruthy();
  expect(myAtt.getName()).toBe('Dexterity');
  expect(myAtt.getValue()).toBe(19);
  expect(myAtt.getModifier()).toBe(4);

  // getters and setters
  myAtt.setName('Strength');
  expect(myAtt.getName()).toBe('Strength');
  myAtt.setValue(21);
  expect(myAtt.getValue()).toBe(21);
  expect(myAtt.getModifier()).toBe(5);
  myAtt.changeValue(3);
  expect(myAtt.getValue()).toBe(24);
  expect(myAtt.getModifier()).toBe(7);
});
