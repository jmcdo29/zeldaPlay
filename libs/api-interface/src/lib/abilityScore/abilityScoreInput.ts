import { AbilityScore } from './abilityScore';

export interface AbilityScoreInput extends Partial<AbilityScore> {
  value: number;
  name: string;
  characterId: string;
}
