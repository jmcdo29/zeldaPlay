process.env.NODE_ENV = 'production';
import { myMorgan } from '../../src/middleware/morgan';

test('myMorgan should be a function (prod)', () => {
  expect(typeof myMorgan).toBe('function');
});
