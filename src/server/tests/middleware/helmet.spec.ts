import { myHelmet } from '../../src/middleware/helmet';

test('myHelmet should be a function', () => {
  expect(typeof myHelmet).toBe('function');
});
