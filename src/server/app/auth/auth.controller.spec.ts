import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from '@Auth/auth.controller';
import { AuthService } from '@Auth/auth.service';

const testCode = 'accessCode';
const testEmail = 'test@test.email';
const testPassword = 'Passw0rd!';

const AuthServiceStub = {
  login: jest
    .fn()
    .mockReturnValueOnce({ accessCode: testCode, id: 'userId' })
    .mockImplementationOnce(() => {
      throw new Error('Invalid password');
    }),
  signup: jest
    .fn()
    .mockReturnValueOnce({ accessCode: testCode, id: 'newUserId' })
    .mockImplementationOnce(() => {
      throw new Error('Passwords do not match');
    })
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
    it('should let a user login', async () => {
      const loginRes = await controller.login({
        email: testEmail,
        password: testPassword
      });
      expect(loginRes).toEqual({ accessCode: testCode, id: 'userId' });
    });
    it('should fail login', async () => {
      try {
        await controller.login({ email: testEmail, password: testPassword });
      } catch (err) {
        expect(err).toEqual(new Error('Invalid password'));
      }
    });
  });
  describe('#signup', () => {
    it('should allow a user to signup', async () => {
      const signupRes = await controller.signup({
        email: testEmail,
        password: testPassword,
        confirmationPassword: testPassword,
        recovery: []
      });
      expect(signupRes).toEqual({ accessCode: testCode, id: 'newUserId' });
    });
    it('should fail signup for some reason', async () => {
      try {
        await controller.signup({
          email: testEmail,
          password: testPassword,
          confirmationPassword: 'somehtingElse',
          recovery: []
        });
      } catch (err) {
        expect(err).toEqual(new Error('Passwords do not match'));
      }
    });
  });
  describe('#logout', () => {
    it('should just return. No logic', async () => {
      const result = await controller.logout();
      expect(result).toBe(undefined);
    });
  });
});
