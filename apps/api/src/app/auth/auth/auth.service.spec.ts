import { createMock } from '@golevelup/nestjs-testing';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { of } from 'rxjs';

import { GoogleUserService } from '../google-user/google-user.service';
import { GoogleUser } from '../user/models/google-user.model';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { GoogleSub } from './models/google.payload';

const passVal = 'Pa$$w0rd';
const badPassVal = 'Passw0rd';
const email = 'test@test.com';

const mockGoogleUser: GoogleUser = {
  id: 'USR-id',
  email,
  roles: ['player'],
  googleId: 'Google Id',
  firstName: 'test',
  lastName: 'test',
};

const userObserver = (done: () => void) => ({
  next(token: { id: string; token: string }) {
    expect(token).toEqual({ id: 'USR-TEST', token: 'token' });
  },
  error(error: Error) {
    throw error;
  },
  complete() {
    done();
  },
});

const errorObserver = (
  done: () => void,
  errorValue: { statusCode: number; error: string; message: string },
) => ({
  next(value: unknown) {
    throw new Error('Expected null got value: ' + value);
  },
  error(error: Error) {
    expect(error.message).toEqual(errorValue);
    done();
  },
  complete() {
    done();
  },
});

const googleSubscriber = (
  done: () => void,
  spy: jest.SpyInstance,
  callTimes: number,
) => ({
  next: (val: GoogleUser) => {
    expect(val).toEqual(mockGoogleUser);
  },
  error: (err: Error) => {
    throw err;
  },
  complete: () => {
    expect(spy).toBeCalledTimes(callTimes);
    done();
  },
});

describe('AuthService', () => {
  let service: AuthService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            getByEmail: jest.fn().mockReturnValue(
              of({
                id: 'USR-TEST',
                email,
                role: ['player'],
                password: passVal,
              }),
            ),
            insertUser: jest.fn().mockReturnValue(
              of({
                id: 'USR-TEST',
              }),
            ),
          },
        },
        {
          provide: GoogleUserService,
          useValue: {
            getByGoogleId: jest.fn().mockReturnValue(of({})),
            createNewGoogleUser: jest.fn().mockReturnValue(of({})),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('token'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('Local Strategy', () => {
    describe('login', () => {
      let compareSpy: jest.SpyInstance;
      beforeEach(() => {
        compareSpy = jest.spyOn(bcrypt, 'compare');
      });
      afterEach(() => {
        jest.clearAllMocks();
      });
      it('should return a token', (done) => {
        compareSpy.mockResolvedValueOnce(true);
        service
          .login({ email, password: passVal })
          .subscribe(userObserver(done));
      });
      it('should throw an error', (done) => {
        compareSpy.mockResolvedValueOnce(false);
        service.login({ email, password: badPassVal }).subscribe(
          errorObserver(done, {
            statusCode: 401,
            error: 'Unauthorized',
            message: 'Invalid email or password.',
          }),
        );
      });
    });
    describe('signup', () => {
      const signupTest = {
        email,
        password: passVal,
        confirmationPassword: passVal,
        consentToEmail: true,
        role: ['player'],
        firstName: 'Tester',
        lastName: 'McTesting',
      };
      it('should allow a user to signup', (done) => {
        const userService = module.get<UserService>(UserService);
        jest
          .spyOn(userService, 'getByEmail')
          .mockReturnValueOnce(of(undefined));
        service
          .signup(signupTest)
          .subscribe(userObserver(done))
          .unsubscribe();
      });
      it('should throw an error for same email address', (done) => {
        service
          .signup(signupTest)
          .subscribe(
            errorObserver(done, {
              statusCode: 400,
              error: 'Bad Request',
              message: 'Email already in use',
            }),
          )
          .unsubscribe();
      });
    });
  });
  describe('Google Strategy', () => {
    describe('findOrCreateGoogleUser', () => {
      let googleService: GoogleUserService;

      beforeEach(() => {
        googleService = module.get<GoogleUserService>(GoogleUserService);
      });

      afterEach(() => {
        jest.clearAllMocks();
      });
      it('should find and return a Google User', (done) => {
        const getGoogleSpy = jest
          .spyOn(googleService, 'getByGoogleId')
          .mockReturnValueOnce(of(mockGoogleUser));
        service
          .findOrCreateGoogleUser(createMock<GoogleSub>())
          .subscribe(googleSubscriber(done, getGoogleSpy, 1));
      });
      it('should not find, but still create ad return a Google User', (done) => {
        jest
          .spyOn(googleService, 'getByGoogleId')
          .mockReturnValueOnce(of(undefined));
        const createSpy = jest
          .spyOn(googleService, 'createNewGoogleUser')
          .mockReturnValueOnce(of(mockGoogleUser));
        service
          .findOrCreateGoogleUser(createMock<GoogleSub>())
          .subscribe(googleSubscriber(done, createSpy, 1));
      });
    });
  });
  describe('validateUser', () => {
    it('should get a user', (done) => {
      service
        .validateUser({
          email,
          role: ['player'],
          id: 'USR-TEST',
        })
        .subscribe({
          next(user) {
            expect(user.id).toBe('USR-TEST');
            expect(user.email).toBe(email);
            expect(user.role).toEqual(['player']);
            expect(typeof user.password).toBe('string');
          },
          error(error: Error) {
            throw error;
          },
          complete() {
            done();
          },
        })
        .unsubscribe();
    });
  });
});
