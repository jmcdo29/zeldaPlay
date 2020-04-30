import { createMock } from '@golevelup/nestjs-testing';
import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalGuard } from './local.guard';

describe('LocalGuard', () => {
  let guard: LocalGuard;

  beforeEach(() => {
    guard = new LocalGuard();
  });
  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
  it('should return true for `canActivate`', async () => {
    AuthGuard('local').prototype.canActivate = jest.fn(() =>
      Promise.resolve(true),
    );
    AuthGuard('local').prototype.logIn = jest.fn(() => Promise.resolve());
    expect(await guard.canActivate(createMock<ExecutionContext>())).toBe(true);
  });
});
