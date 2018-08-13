import { Request, Response } from 'express';
import * as rp from 'request-promise';
import * as supertest from 'supertest';
import { app } from '../../src/server';
import {
  badLogIn,
  databaseProblem,
  generalError,
  logErrors
} from '../../src/utils/errorHandlers';
import { DatabaseError } from '../../src/utils/errors/DatabaseError';
import { LoginError } from '../../src/utils/errors/LoginError';

describe('middleware error handlers', () => {
  let req: any;
  let res: any;

  const next = jest.fn();

  beforeEach(() => {
    req = {
      param: '',
      body: ''
    };
    res = {
      data: null,
      code: null,
      status(status) {
        this.code = status;
        return this;
      },
      send(payload) {
        this.data = payload;
      }
    };

    next.mockClear();
  });

  test('should log error', () => {
    logErrors(
      new Error('this is an error'),
      req as Request,
      res as Response,
      next
    );

    expect(res.code).toBeDefined();
    expect(res.code).toBe(null);
  });

  test('should log a full error that has a reasonCode', () => {
    logErrors(
      new LoginError('this is an error', 'NO_USER'),
      req as Request,
      res as Response,
      next
    );

    expect(res.code).toBeDefined();
    expect(res.code).toBe(null);
  });

  test('should be a logInError', () => {
    badLogIn(
      new LoginError('User not found', 'NO_USER'),
      req as Request,
      res as Response,
      next
    );

    expect(res.code).toBeDefined();
    expect(res.code).toBe(403);
  });

  test("should't be a logInError", () => {
    badLogIn(
      new DatabaseError('QueryProblem', 'DB_ERROR'),
      req as Request,
      res as Response,
      next
    );

    expect(res.code).toBeDefined();
    expect(next.mock.calls[0][0]).toBeTruthy();
  });

  test('should be a databaseError', () => {
    databaseProblem(
      new DatabaseError('Query Probem', 'DB_ERROR'),
      req as Request,
      res as Response,
      next
    );

    expect(res.code).toBeDefined();
    expect(res.code).toBe(400);
  });

  test("shouldn't be a databaseError", () => {
    databaseProblem(
      new LoginError('User not found', 'NO_USER'),
      req as Request,
      res as Response,
      next
    );

    expect(res.code).toBeDefined();
    expect(next.mock.calls[0][0]).toBeTruthy();
  });

  test('should be a general Error', () => {
    generalError(new Error('Normal error'), req as Request, res as Response);

    expect(res.code).toBeDefined();
    expect(res.code).toBe(500);
  });
});
