import { isLoggedIn, verifyMiddleware } from '../../src/services/auth.service';
import { verifyToken } from '../../src/utils/jwt';

jest.mock('../../src/utils/jwt.ts', () => {
  return {
    verifyToken: jest.fn().mockReturnValue('verified')
  };
});

describe('verifyMiddleware', () => {
  test('verified', () => {
    const next = jest.fn();
    verifyMiddleware(
      {
        headers: { authorization: 'auth' },
        params: { userId: 'id' },
        hostname: 'host'
      } as any,
      {} as any,
      next as any
    );
    expect(next).toHaveBeenCalled();
  });
  test('errorred', () => {
    const next = jest.fn();
    const err = new Error('ERROR');
    (verifyToken as jest.Mock).mockImplementation(() => {
      throw err;
    });
    verifyMiddleware(
      {
        headers: { authorization: 'auth' },
        params: { userId: 'id' },
        hostname: 'host'
      } as any,
      {} as any,
      next as any
    );
    expect(next).toHaveBeenCalledWith(err);
  });
});

describe('isLoggedIn', () => {
  test('logged in', () => {
    const next = jest.fn();
    isLoggedIn(
      {
        headers: {
          cookie: 'cookie exists'
        }
      } as any,
      {} as any,
      next
    );
    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith();
  });
  test('not logged in', () => {
    const next = jest.fn();
    isLoggedIn(
      {
        headers: {}
      } as any,
      {} as any,
      next
    );
    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(new Error('Not logged in.'));
  });
});
