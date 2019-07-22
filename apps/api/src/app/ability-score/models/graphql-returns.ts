import { AbilityScoreInputDTO } from './ability-score-insert';
import { AbilityScoreUpdateDTO } from './ability-score-update';
import { AbilityScoreDTO } from './ability-score.graphql';

export const ofAbilityScore = (of) => AbilityScoreDTO;

export const returnAbilityScore = (returns) => AbilityScoreDTO;
export const returnAbilityScores = (returns) => [AbilityScoreDTO];

export const typeAbilityScoreInputs = () => [AbilityScoreInputDTO];
export const typeAbilityScoreUpdates = () => [AbilityScoreUpdateDTO];
