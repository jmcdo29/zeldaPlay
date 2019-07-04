import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { hashSync } from 'bcrypt';
import { of } from 'rxjs';

import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

const userObserver = (done: () => void) => ({
  next(token: { id: string; token: string }) {
    expect(token).toEqual({ id: 'USR-TEST', token: 'token' });
  },
  error(error: Error) {
    throw error;
  },
  complete() {
    done();
  }
});

const errorObserver = (
  done: () => void,
  errorValue: { statusCode: number; error: string; message: string }
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
  }
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
                email: 'test@test.com',
                role: ['player'],
                password: hashSync('Pa$$w0rd', 12)
              })
            ),
            insertUser: jest.fn().mockReturnValue(
              of({
                id: 'USR-TEST'
              })
            )
          }
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('token')
          }
        }
      ]
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('login', () => {
    it('should return a token', (done) => {
      service
        .login({ email: 'test@test.com', password: 'Pa$$w0rd' })
        .subscribe(userObserver(done));
    });
    it('should throw an error', (done) => {
      service.login({ email: 'test@test.com', password: 'Passw0rd' }).subscribe(
        errorObserver(done, {
          statusCode: 401,
          error: 'Unauthorized',
          message: 'Invalid email or password.'
        })
      );
    });
  });
  describe('signup', () => {
    const signupTest = {
      email: 'test@test.com',
      password: 'Pa$$w0rd',
      confirmationPassword: 'Pa$$w0rd',
      consentToEmail: true,
      role: ['player'],
      firstName: 'Tester',
      lastName: 'McTesting'
    };
    it('should allow a user to signup', (done) => {
      const userService = module.get<UserService>(UserService);
      jest.spyOn(userService, 'getByEmail').mockReturnValueOnce(of(undefined));
      service.signup(signupTest).subscribe(userObserver(done));
    });
    it('should throw an error for same email address', (done) => {
      service.signup(signupTest).subscribe(
        errorObserver(done, {
          statusCode: 400,
          error: 'Bad Request',
          message: 'Email already in use'
        })
      );
    });
  });
  describe('validateUser', () => {
    it('should get a user', (done) => {
      service
        .validateUser({
          email: 'test@test.com',
          role: ['player'],
          id: 'USR-TEST'
        })
        .subscribe({
          next(user) {
            expect(user.id).toBe('USR-TEST');
            expect(user.email).toBe('test@test.com');
            expect(user.role).toEqual(['player']);
            expect(typeof user.password).toBe('string');
          },
          error(error: Error) {
            throw error;
          },
          complete() {
            done();
          }
        });
    });
  });
});
