import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { hashSync } from 'bcrypt';
import { of } from 'rxjs';

import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

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
      service.login({ email: 'test@test.com', password: 'Pa$$w0rd' }).subscribe(
        (token) => {
          expect(token).toEqual({ id: 'USR-TEST', token: 'token' });
        },
        (error) => {
          throw new Error(error);
        },
        () => done()
      );
    });
    it('should throw an error', (done) => {
      service.login({ email: 'test@test.com', password: 'Passw0rd' }).subscribe(
        () => {
          throw new Error('Should not be here');
        },
        (error) => {
          expect(error.message).toEqual({
            statusCode: 401,
            error: 'Unauthorized',
            message: 'Invalid email or password.'
          });
          done();
        }
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
      service.signup(signupTest).subscribe(
        (newUser) => {
          expect(newUser).toEqual({ id: 'USR-TEST', token: 'token' });
        },
        (error) => {
          throw new Error(error);
        },
        () => done()
      );
    });
    it('should throw an error for same email address', (done) => {
      service.signup(signupTest).subscribe(
        () => {
          throw new Error('Should not be here');
        },
        (error) => {
          expect(error.message).toEqual({
            statusCode: 400,
            error: 'Bad Request',
            message: 'Email already in use'
          });
          done();
        }
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
        .subscribe(
          (user) => {
            expect(user.id).toBe('USR-TEST');
            expect(user.email).toBe('test@test.com');
            expect(user.role).toEqual(['player']);
            expect(typeof user.password).toBe('string');
          },
          (error) => {
            throw new Error(error);
          },
          () => done()
        );
    });
  });
});
