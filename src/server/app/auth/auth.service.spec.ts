import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from '@Auth/auth.service';
import { JwtStrategy } from '@Auth/jwt.strategy';

import { UserService } from '@User/user.service';

process.env.TOKEN_SECRET = 'some secret';

const testEmail = 'test@test.email';
const testPass = 'Passw0rd!';
const testId = 'testId';

const userServiceMock = {
  login: jest.fn(),
  signup: jest.fn(),
  findUserByEmail: jest.fn()
};

describe('AuthService', () => {
  let service: AuthService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({ secretOrPrivateKey: 'aKey' })],
      providers: [
        AuthService,
        JwtStrategy,
        {
          provide: UserService,
          useValue: userServiceMock
        }
      ]
    }).compile();
    service = module.get<AuthService>(AuthService);
  });
  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
  describe('login', () => {
    it('should allow a user to log in', async () => {
      const loginSpy = jest
        .spyOn(userServiceMock, 'login')
        .mockImplementationOnce(() => ({ pEmail: testEmail, pId: testId }));
      const loginRes = await service.login({
        email: testEmail,
        password: testPass
      });
      expect(loginSpy).toBeCalled();
      expect(loginSpy).toBeCalledWith({ email: testEmail, password: testPass });
      expect(loginRes.accessToken).toBeTruthy();
      expect(loginRes.id).toBe(testId);
    });
  });
  describe('signup', () => {
    it('should allow a user to signup', async () => {
      const signupSpy = jest
        .spyOn(userServiceMock, 'signup')
        .mockReturnValueOnce({ pEmail: testEmail, pId: testId });
      const signupRes = await service.signup({
        email: testEmail,
        password: testPass,
        confirmationPassword: testPass
      });
      expect(signupSpy).toBeCalled();
      expect(signupSpy).toBeCalledWith({
        email: testEmail,
        password: testPass,
        confirmationPassword: testPass
      });
      expect(signupRes.accessToken).toBeTruthy();
      expect(signupRes.id).toBe(testId);
    });
  });
  describe('validateUser', () => {
    it('should validate the token from the user', async () => {
      const findSpy = jest
        .spyOn(userServiceMock, 'findUserByEmail')
        .mockImplementationOnce(() => [{ pEmail: testEmail, pId: testId }]);
      const validateRes = await service.validateUser({
        provider: 'local',
        email: testEmail,
        id: testId,
        iat: Date.now().toString(),
        exp: '3000'
      });
      expect(findSpy).toBeCalledWith(testEmail);
      expect(validateRes).toEqual({ pEmail: testEmail, pId: testId });
    });
    it('should throw an error for an invalid token', async () => {
      try {
        await service.validateUser({ provider: '' } as any);
      } catch (err) {
        expect(err.message.message).toBe('Login invalid. Please log in again.');
      }
    });
  });
});
