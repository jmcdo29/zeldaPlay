import { AuthModule } from '@Auth/auth.module';

describe('#AuthModule', () => {
  test('auth module should be truthy', () => {
    expect(AuthModule).toBeTruthy();
  });
});
