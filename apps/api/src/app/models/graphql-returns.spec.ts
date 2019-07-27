import 'reflect-metadata';
import { Int } from 'type-graphql';
import * as returns from './gqlReturns';
import { MessageDTO } from './message.graphql';

describe('AppModule gql returns', () => {
  it('should have a return type for ofMessage', () => {
    expect(returns.ofMessage()).toBe(MessageDTO);
  });
  it('should have a return type for returnMessage', () => {
    expect(returns.returnMessage()).toBe(MessageDTO);
  });
  it('should have a return type for returnString', () => {
    expect(returns.returnString()).toBe(String);
  });
  it('should have a return type for typeString', () => {
    expect(returns.typeString()).toBe(String);
  });
  it('should have a return type for typeInt', () => {
    expect(returns.typeInt()).toBe(Int);
  });
  it('should have a return type for typeBoolean', () => {
    expect(returns.typeBoolean()).toBe(Boolean);
  });
  it('should have a return type for typeStrings', () => {
    expect(returns.typeStrings()).toEqual([String]);
  });
});
