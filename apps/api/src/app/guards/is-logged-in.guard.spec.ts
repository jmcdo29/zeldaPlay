import { IsLoggedInGuard } from './is-logged-in.guard';

describe('IsLoggedInGuard', () => {
  it('should be defined', () => {
    expect(new IsLoggedInGuard()).toBeDefined();
  });
});
