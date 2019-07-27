import 'reflect-metadata';
import { AbilityScoreInputDTO } from './ability-score-insert';
import { AbilityScoreUpdateDTO } from './ability-score-update';
import { AbilityScoreDTO } from './ability-score.graphql';
import * as returned from './graphql-returns';

describe('AbilityScore GraphQL returns', () => {
  it('should have the return type for ofAbilityScore', () => {
    expect(returned.ofAbilityScore()).toBe(AbilityScoreDTO);
  });
  it('should have the return type for returnAbilityScore', () => {
    expect(returned.returnAbilityScore()).toBe(AbilityScoreDTO);
  });
  it('should have the return type for returnAbilityScores', () => {
    expect(returned.returnAbilityScores()).toEqual([AbilityScoreDTO]);
  });
  it('should have the return type for typeAbilityScoreInputs', () => {
    expect(returned.typeAbilityScoreInputs()).toEqual([AbilityScoreInputDTO]);
  });
  it('should have the return type for typeAbilityScoreUpdates', () => {
    expect(returned.typeAbilityScoreUpdates()).toEqual([AbilityScoreUpdateDTO]);
  });
});
