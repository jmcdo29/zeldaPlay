import 'reflect-metadata';
import { CharacterDTO } from './character.graphql';
import * as returns from './graphql-returns';

describe('CharacterModule graphql returns', () => {
  it('should have a return type for ofCharacter', () => {
    expect(returns.ofCharacter()).toBe(CharacterDTO);
  });
  it('should have a return type for returnCharacter', () => {
    expect(returns.returnCharacter()).toBe(CharacterDTO);
  });
  it('should have a return type for returnCharacters', () => {
    expect(returns.returnCharacters()).toEqual([CharacterDTO]);
  });
});
