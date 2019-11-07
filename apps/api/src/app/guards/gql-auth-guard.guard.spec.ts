import { makeMock } from '@levelup-nestjs/testing';
import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlAuthGuard } from './gql-auth-guard.guard';

AuthGuard('google').prototype.canActivate = jest
  .fn()
  .mockImplementation(() => true);

AuthGuard('google').prototype.logIn = jest.fn().mockImplementation(() => true);

describe('GqlAuthGuard', () => {
  let guard: GqlAuthGuard;

  beforeEach(() => {
    guard = new GqlAuthGuard();
  });
  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
  it('should run the functions', () => {
    expect(guard.getRequest(makeMock<ExecutionContext>())).toBeTruthy();
  });
  it('should return true for canActivate', async () => {
    const getRequestSpy = jest.spyOn(guard, 'getRequest');
    expect(await guard.canActivate(makeMock<ExecutionContext>())).toBeTruthy();
    expect(getRequestSpy).toBeCalledTimes(1);
  });
});
