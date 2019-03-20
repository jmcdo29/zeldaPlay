import { UserServerModule } from '@User/user.module';

describe('#UserModule', () => {
  test('user module should be truthy', () => {
    expect(UserServerModule).toBeTruthy();
  });
});
