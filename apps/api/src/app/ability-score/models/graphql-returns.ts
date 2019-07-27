import { AbilityScoreInputDTO } from './ability-score-insert';
import { AbilityScoreUpdateDTO } from './ability-score-update';
import { AbilityScoreDTO } from './ability-score.graphql';

export const ofAbilityScore = () => AbilityScoreDTO;

export const returnAbilityScore = () => AbilityScoreDTO;
export const returnAbilityScores = () => [AbilityScoreDTO];

export const typeAbilityScoreInputs = () => [AbilityScoreInputDTO];
export const typeAbilityScoreUpdates = () => [AbilityScoreUpdateDTO];
