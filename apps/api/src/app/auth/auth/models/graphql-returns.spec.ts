import 'reflect-metadata';
import { AuthDTO } from './auth.graphql';
import * as returns from './graphql-returns';

describe('AuthModule graphql returns', () => {
  it('should have a return type for ofAuth', () => {
    expect(returns.ofAuth()).toBe(AuthDTO);
  });
  it('should have a return type for returnAuth', () => {
    expect(returns.returnAuth()).toBe(AuthDTO);
  });
});
