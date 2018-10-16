import * as Express from 'express';

import { useErrorHandlers, useMiddleware } from '../../src/middleware';

const app = Express();

test('useErrorHandlers should be a function', () => {
  useErrorHandlers(app);
  expect(typeof useErrorHandlers).toBe('function');
});

test('useMiddleware should be a function', () => {
  useMiddleware(app);
  expect(typeof useMiddleware).toBe('function');
});
