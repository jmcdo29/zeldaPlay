import 'reflect-metadata';
import * as returns from './graphql-returns';
import { UserDTO } from './user.graphql';

describe('UserModule graphql returns', () => {
  it('should have a return type for ofUser', () => {
    expect(returns.ofUser()).toBe(UserDTO);
  });
  it('should have a return type for returnUser', () => {
    expect(returns.returnUser()).toBe(UserDTO);
  });
});
