import { createMock } from '@golevelup/nestjs-testing';
import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GoogleGuard } from './google.guard';

AuthGuard('google').prototype.canActivate = jest
  .fn()
  .mockImplementation(() => true);

AuthGuard('google').prototype.logIn = jest.fn().mockImplementation(() => true);

describe('GqlAuthGuard', () => {
  let guard: GoogleGuard;

  beforeEach(() => {
    guard = new GoogleGuard();
  });
  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
  it('should return true for canActivate', async () => {
    expect(
      await guard.canActivate(createMock<ExecutionContext>()),
    ).toBeTruthy();
  });
});
