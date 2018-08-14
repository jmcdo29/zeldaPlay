import { Request, Response } from 'express';
import { catchAll } from '../../src/utils/catchErrors';

test('should make and throw an error', () => {
  let req: any;
  let res: any;

  const next = jest.fn();

  req = {
    query: '',
    params: '',
    ip: '',
    originalUrl: ''
  };
  res = {
    body: ''
  };
  catchAll(req as Request, res as Response, next);
  expect(next.mock.calls[0][0]).toBeTruthy();
  expect(typeof next.mock.calls[0][0]).toBe('object');
});
