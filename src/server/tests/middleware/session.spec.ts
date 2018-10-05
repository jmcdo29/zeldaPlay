import { mySession } from '../../src/middleware/session';

test('mySession should be a function', () => {
  expect(typeof mySession).toBe('function');
});
