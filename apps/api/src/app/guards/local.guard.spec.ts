import { createMock } from '@golevelup/nestjs-testing';
import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext, GraphQLExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { LocalGuard } from './local.guard';

const testEmail = 'testEmail';

describe('LocalGuard', () => {
  let guard: LocalGuard;

  beforeEach(() => {
    guard = new LocalGuard();
  });
  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
  it('should be able to get request', () => {
    GqlExecutionContext.create = jest.fn((context: ExecutionContext) => {
      return createMock<GraphQLExecutionContext>({
        getContext: () => ({
          req: {
            body: {
              variables: {
                email: testEmail,
              },
              somethingElse: 'some other value',
            },
          },
        }),
      });
    });

    expect(guard.getRequest(createMock<ExecutionContext>())).toEqual({
      body: {
        variables: {
          email: testEmail,
        },
        somethingElse: 'some other value',
        email: testEmail,
      },
    });
  });
  it('should return true for `canActivate`', async () => {
    AuthGuard('local').prototype.canActivate = jest.fn(() =>
      Promise.resolve(true),
    );
    AuthGuard('local').prototype.logIn = jest.fn(() => Promise.resolve());
    expect(await guard.canActivate(createMock<ExecutionContext>())).toBe(true);
  });
});
