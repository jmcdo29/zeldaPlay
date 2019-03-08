import { SharedModule } from '../app/shared/shared.module';
import {
  INestApplication,
  INestFastifyApplication,
  ValidationPipe
} from '@nestjs/common';
import { FastifyAdapter } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { AuthService } from '@Auth/auth.service';

describe('End to End Testing', () => {
  let app: INestApplication & INestFastifyApplication;
  const authService = {
    login: (user: any) => ({ token: 'a token goes here' }),
    signup: (newUser: any) => ({ token: 'a token goes here' })
  };

  beforeAll(async () => {
    process.env.TOKEN_SECRET = 'secert';
    const module = await Test.createTestingModule({
      imports: [SharedModule]
    })
      .overrideProvider(AuthService)
      .useValue(authService)
      .compile();
    app = module.createNestApplication(new FastifyAdapter());
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('Shared Module', () => {
    describe('Auth controller', () => {
      it('POST /login', async () => {
        const res = await app.inject({
          method: 'POST',
          url: '/users/login',
          payload: {
            user: {
              email: 'Test@test.com',
              password: 'Testing123!@#'
            }
          }
        });
        expect(res.payload).toEqual(
          JSON.stringify({ token: 'a token goes here' })
        );
        expect(res.statusCode).toBe(201);
      });
      it('POST /signup', async () => {
        const res = await app.inject({
          method: 'POST',
          url: '/users/signup',
          payload: {
            user: {
              email: 'Test@test.com',
              password: 'Testing123!@#',
              confirmationPassword: 'Testing123!@#'
            }
          }
        });
        expect(res.payload).toEqual(
          JSON.stringify({ token: 'a token goes here' })
        );
        expect(res.statusCode).toBe(201);
      });
      it('POST /logout', async () => {
        const res = await app.inject({
          method: 'POST',
          url: '/users/logout'
        });
        expect(res.statusCode).toBe(201);
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
