import { Twili } from './twili';

test('should create a twili', () => {
  const myTwili = new Twili();
  expect(myTwili).toBeTruthy();
  expect(myTwili.race).toBe('Twili');
  expect(myTwili.attributes[3].value).toBe(10);
  expect(myTwili.attributes[2].value).toBe(10);
  expect(myTwili.attributes[4].value).toBe(6);
});
