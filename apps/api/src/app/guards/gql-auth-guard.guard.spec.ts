import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { GqlAuthGuard } from './gql-auth-guard.guard';

GqlExecutionContext.create = jest.fn().mockReturnValue({
  getContext: jest.fn().mockReturnThis(),
  value: 'something',
  req: 'Request',
});

const mockContext: ExecutionContext = {
  switchToHttp: jest.fn().mockReturnValue({
    getResponse: jest.fn(),
    getRequest: jest.fn(),
  }),
  getClass: jest.fn().mockReturnThis(),
  getHandler: jest.fn().mockReturnThis(),
  getArgs: jest.fn().mockReturnThis(),
  getArgByIndex: jest.fn().mockReturnThis(),
  switchToRpc: jest.fn().mockReturnThis(),
  switchToWs: jest.fn().mockReturnThis(),
  getType: jest.fn().mockReturnThis(),
};

AuthGuard('jwt').prototype.canActivate = jest
  .fn()
  .mockImplementation(() => true);

describe('GqlAuthGuard', () => {
  let guard: GqlAuthGuard;

  beforeEach(() => {
    guard = new GqlAuthGuard();
  });
  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
  it('should run the functions', () => {
    expect(guard.getRequest({} as any)).toBeTruthy();
  });
  it('should return true for canActivate', () => {
    expect(guard.canActivate(mockContext)).toBeTruthy();
  });
});
