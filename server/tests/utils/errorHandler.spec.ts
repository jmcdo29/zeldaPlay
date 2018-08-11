import * as supertest from 'supertest';
import { app } from '../../src/server';
import { DatabaseError } from '../../src/utils/errors/DatabaseError';
import { LoginError } from '../../src/utils/errors/LoginError';

test('log errors should log the error and head to the next function', () => {
  return supertest
    .agent(app)
    .get('/badUrl')
    .expect(500);
});

/* test('bad log in should be a loginError and should return a 403', () => {
  const logInErrorTestStatus = jest.fn();
  const logInErrorTestNext = jest.fn();
  const sendTest = jest.fn();
  const err = new LoginError('this is a general error', 'NO_USER');
  const res = {
    status: logInErrorTestStatus,
    send: sendTest
  };
  const next = {
    next: logInErrorTestNext
  };
  // badLogIn(err, {} as any, res as any, next as any);
  /* expect(logInErrorTestStatus.mock.calls).toBe(403);
  expect(logInErrorTestNext.mock.calls).toHaveLength(0);
  expect(sendTest.mock.calls).toBeTruthy();
});

test('databaseProblem should be a query error and return a 400', () => {
  const databaseProblemTestNext = jest.fn();
  const databaseProblemTestStatus = jest.fn();
  const sendTest = jest.fn();
  const err = new DatabaseError('this is a general error', 'DB_PROB');
  const res = {
    status: databaseProblemTestStatus,
    send: sendTest
  };
  const next = {
    next: databaseProblemTestNext
  };
  // databaseProblem(err, {} as any, res as any, next as any);
  expect(databaseProblemTestNext.mock.calls).toHaveLength(0);
  expect(databaseProblemTestStatus.mock.calls).toBe(400);
  expect(sendTest.mock.calls).toBeTruthy();
});

test('generalError should catch all others and return a 500', () => {
  const generalErrorTest = jest.fn();
  const sendTest = jest.fn();
  const err = new Error('this is a general error');
  const res = {
    status: generalErrorTest,
    send: sendTest
  };
  // generalError(err, {} as any, res as any);
  expect(generalErrorTest.mock.calls).toBe(500);
  expect(sendTest.mock.calls).toBeTruthy(); */
/* }); */
