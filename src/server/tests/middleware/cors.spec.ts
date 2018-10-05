import { myCors } from '../../src/middleware/cors';

test('it should be a function', () => {
  expect(typeof myCors).toBe('function');
});
