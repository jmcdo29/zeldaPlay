import * as express from 'express';
import * as session from 'express-session';
import * as supertest from 'supertest';

import { UserRouter } from '../../src/controllers/user.controller';
import { User } from '../../src/db/models/user_schema';
import { login, signUp } from '../../src/services/user.service';
import { LoginError } from '../../src/utils/errors/LoginError';

jest.mock('../../src/services/user.service.ts', () => {
  return {
    login: jest.fn(),
    signUp: jest.fn()
  };
});

jest.mock('../../src/utils/jwt.ts', () => {
  return {
    signToken: jest.fn().mockReturnValue('a really.long string.is the token')
  };
});

describe('User routes', () => {
  const app = express();
  app.use(express.json());
  app.use(
    session({
      secret: 'shhh its a secret!',
      store: new session.MemoryStore()
    })
  );
  UserRouter(app, '/');
  const request = supertest.agent(app);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('/login route', () => {
    test('200 should return user', async () => {
      (login as jest.Mock).mockResolvedValueOnce({ id: 'user id' });
      const response = await request
        .post('/login')
        .send({ username: 'user', password: 'pass' });
      expect(login).toHaveBeenCalledTimes(1);
      expect(login).toBeCalledWith('user', 'pass');
      expect(response.body).toEqual({
        token: 'a really.long string.is the token',
        id: 'user id'
      });
    });

    test('403 should return LoginError', async () => {
      (login as jest.Mock).mockRejectedValueOnce(
        new LoginError('No User found.', 'NO_USER')
      );
      const response = await request
        .post('/login')
        .send({ username: 'user', password: 'pass' });
      expect(login).toHaveBeenCalledTimes(1);
      expect(login).toBeCalledWith('user', 'pass');
      expect(response.error).toBeTruthy();
    });

    test('400 should return DatabaseError', async () => {
      (login as jest.Mock).mockRejectedValueOnce(
        new Error('Something is wrong')
      );
      const response = await request
        .post('/login')
        .send({ username: 'user', password: 'pass' });
      expect(login).toHaveBeenCalledTimes(1);
      expect(login).toBeCalledWith('user', 'pass');
      expect(response.error).toBeTruthy();
    });
  });

  describe('/signup route', () => {
    test('200 should return user', async () => {
      const tempUser = new User();
      tempUser.id = 'user id';
      (signUp as jest.Mock).mockResolvedValueOnce(tempUser);
      const response = await request
        .post('/signup')
        .send({ username: 'user', password: 'pass', confPass: 'pass' });
      expect(signUp).toHaveBeenCalledTimes(1);
      expect(signUp).toBeCalledWith('user', 'pass', 'pass');
      expect(response.body).toEqual({
        token: 'a really.long string.is the token',
        id: 'user id'
      });
    });

    test('403 should return LoginError', async () => {
      (signUp as jest.Mock).mockRejectedValueOnce(
        new LoginError('No User found.', 'NO_USER')
      );
      const response = await request
        .post('/signup')
        .send({ username: 'user', password: 'pass', confPass: 'pass' });
      expect(signUp).toHaveBeenCalledTimes(1);
      expect(signUp).toBeCalledWith('user', 'pass', 'pass');
      expect(response.error).toBeTruthy();
    });

    test('400 should return DatabaseError', async () => {
      (signUp as jest.Mock).mockRejectedValueOnce(
        new Error('Something is wrong')
      );
      const response = await request
        .post('/signup')
        .send({ username: 'user', password: 'pass', confPass: 'pass' });
      expect(signUp).toHaveBeenCalledTimes(1);
      expect(signUp).toBeCalledWith('user', 'pass', 'pass');
      expect(response.error).toBeTruthy();
    });
  });

  describe('/logout route', () => {
    test('200 response', async () => {
      const response = await request.post('/logout').send({});
      expect(response).toBeTruthy();
    });
  });
});
