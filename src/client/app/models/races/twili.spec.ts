import { Twili } from '#Races/twili';

test('should create a twili', () => {
  const myTwili = new Twili();
  expect(myTwili).toBeTruthy();
  expect(myTwili.getRace()).toBe('Twili');
  expect(myTwili.getAttributes()[3].getValue()).toBe(10);
  expect(myTwili.getAttributes()[2].getValue()).toBe(10);
  expect(myTwili.getAttributes()[4].getValue()).toBe(6);
});
