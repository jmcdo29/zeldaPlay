import * as jwt from 'jsonwebtoken';
import { AuthGuard } from './auth.guard';

process.env.TOKEN_SECRET = 'testSECRET';

jest.mock('jsonwebtoken');

const mock = {
  userService: jest.fn(),
  jwtService: jest.fn(),
  login: jest.fn(),
  signup: jest.fn(),
  validateUser: jest.fn()
};

const context = {
  switchToHttp: () => context,
  getRequest: () => context,
  headers: {
    authorization: 'Bearer accessToken'
  }
};
context.switchToHttp();

describe('#AuthGuard', () => {
  let guard: AuthGuard;
  beforeAll(() => {
    guard = new AuthGuard(mock as any);
  });
  it('should be defined', () => {
    expect(guard).toBeTruthy();
  });
  describe('canActivate function', () => {
    it('should authenticate correctly', async () => {
      const verifySpy = (jwt.verify as any).mockReturnValueOnce('a good token');
      const validateSpy = jest
        .spyOn(guard, 'validate')
        .mockReturnValueOnce(true);
      const valid = await guard.canActivate(context as any);
      expect(verifySpy).toBeCalledWith('accessToken', 'testSECRET');
      expect(validateSpy).toBeCalledWith('a good token');
      expect(valid);
    });
    it('should fail authentication', async () => {
      const verifySpy = jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
        throw new Error('Unverified');
      });
      const valid = await guard.canActivate(context as any);
      expect(verifySpy).toBeCalledWith('accessToken', 'testSECRET');
      expect(!valid);
    });
    it('should return false for no auth', async () => {
      context.headers.authorization = '';
      const valid = await guard.canActivate(context as any);
      expect(!valid);
    });
  });
});
