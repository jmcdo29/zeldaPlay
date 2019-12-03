import { createMock } from '@golevelup/nestjs-testing';
import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GqlAuthGuard } from './gql-auth-guard.guard';

describe('GqlAuthGuard', () => {
  let guard: GqlAuthGuard;

  beforeEach(() => {
    guard = new GqlAuthGuard();
  });
  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
  it('should run the getRequest', () => {
    expect(guard.getRequest(createMock<ExecutionContext>())).toBeTruthy();
  });
  it('should return true for canActivate', async () => {
    GqlExecutionContext.create = jest.fn().mockReturnValue({
      getContext: jest.fn().mockReturnValue({
        req: {
          isAuthenticated: jest.fn().mockReturnValue(true),
        },
      }),
    });
    expect(guard.canActivate(createMock<ExecutionContext>())).toBeTruthy();
  });
});
