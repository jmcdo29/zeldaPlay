import { AbilityScore } from './abilityScore';

export interface AbilityScoreUpdate extends Partial<AbilityScore> {
  id: string;
  value: number;
}
