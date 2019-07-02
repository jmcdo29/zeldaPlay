import { GqlExecutionContext } from '@nestjs/graphql';
import { GqlAuthGuard } from './gql-auth-guard.guard';

GqlExecutionContext.create = jest.fn().mockReturnValue({
  getContext: jest.fn().mockReturnThis(),
  value: 'something',
  req: 'Request'
});

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
});
