import { Attribute } from './attribute';

test('make a new attribute', () => {
  const myAtt = new Attribute();
  myAtt.name = 'Strength';
  myAtt.modifier = 5;
  myAtt.value = 20;
  expect(myAtt).toBeTruthy();
});
