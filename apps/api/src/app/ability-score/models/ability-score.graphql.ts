import { AbilityScore } from '@tabletop-companion/api-interface';
export class AbilityScoreDTO implements AbilityScore {
  id!: string;

  name!: string;

  value!: number;

  characterId!: string;
}
