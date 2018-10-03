import { signToken, verifyToken } from '../../src/utils/jwt';

jest.mock('jsonwebtoken', () => {
  return {
    sign: jest.fn().mockReturnValue('signed'),
    verify: jest.fn().mockReturnValue('verified')
  };
});

test('sign token', () => {
  const signed = signToken({ id: 'some id', url: 'some url' });
  expect(signed).toBe('signed');
});

test('verify token', () => {
  const verified = verifyToken('lkajsdfljasd;lkfja;lksdjf', {
    id: 'the id',
    url: 'some url'
  });
  expect(verified).toBe('verified');
});
