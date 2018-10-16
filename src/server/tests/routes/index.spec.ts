import * as Express from 'express';

import { useRoutes } from '../../src/routes';

const app = Express();

test('it should be a function', () => {
  useRoutes(app);
  expect(typeof useRoutes).toBe('function');
});
