import { IsLoggedInGuard } from './is-logged-in.guard';
import { createMock } from '@golevelup/nestjs-testing';
import { ExecutionContext } from '@nestjs/common';

describe('IsLoggedInGuard', () => {
  let guard: IsLoggedInGuard;

  beforeEach(() => {
    guard = new IsLoggedInGuard();
  });
  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
  it('should return that the user is authenticated', () => {
    expect(
      guard.canActivate(
        createMock<ExecutionContext>({
          switchToHttp: jest.fn().mockReturnValue({
            getRequest: jest.fn().mockReturnValue({
              isAuthenticated: jest.fn().mockReturnValue(true),
            }),
          }),
        }),
      ),
    ).toBe(true);
  });
  it('should return the user is **not** authenticate', () => {
    expect(
      guard.canActivate(
        createMock<ExecutionContext>({
          switchToHttp: jest.fn().mockReturnValue({
            getRequest: jest.fn().mockReturnValue({
              isAuthenticated: jest.fn().mockReturnValue(false),
            }),
          }),
        }),
      ),
    ).toBe(false);
  });
});
