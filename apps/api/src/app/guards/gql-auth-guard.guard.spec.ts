import { GqlAuthGuard } from './gql-auth-guard.guard';

describe('GqlAuthGuard', () => {
  it('should be defined', () => {
    expect(new GqlAuthGuard()).toBeDefined();
  });
});
