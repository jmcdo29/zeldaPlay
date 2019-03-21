import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from '@Auth/auth.controller';
import { AuthService } from '@Auth/auth.service';
import { of } from 'rxjs';

const testCode = 'accessCode';
const testEmail = 'test@test.email';
const testPassword = 'Passw0rd!';

const AuthServiceStub = {
  login: jest
    .fn()
    .mockReturnValueOnce(of({ accessCode: testCode, id: 'userId' })),
  signup: jest
    .fn()
    .mockReturnValueOnce(of({ accessCode: testCode, id: 'newUserId' }))
};

describe('Auth Controller', () => {
  let controller: AuthController;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ useValue: AuthServiceStub, provide: AuthService }]
    }).compile();
    controller = module.get<AuthController>(AuthController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('#login', () => {
    it('should let a user login', () => {
      controller
        .login({
          email: testEmail,
          password: testPassword
        })
        .subscribe((loginRes) => {
          expect(loginRes).toEqual({ accessCode: testCode, id: 'userId' });
        });
    });
  });
  describe('#signup', () => {
    it('should allow a user to signup', () => {
      controller
        .signup({
          email: testEmail,
          password: testPassword,
          confirmationPassword: testPassword,
          recovery: []
        })
        .subscribe((signupRes) => {
          expect(signupRes).toEqual({ accessCode: testCode, id: 'newUserId' });
        });
    });
  });
  describe('#logout', () => {
    it('should just return. No logic', () => {
      controller.logout();
    });
  });
});
