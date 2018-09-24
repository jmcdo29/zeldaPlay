import { verifyMiddleware } from '../../src/services/auth.service';
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
