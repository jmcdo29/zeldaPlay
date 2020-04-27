import { Character } from '@tabletop-companion/api-interface';

export class CharacterDTO implements Character {
  id!: string;

  name!: string;

  race!: string;

  subrace!: string;

  experience!: number;

  maxHealth!: number;

  health!: number;

  isDead = false;

  playerId!: string;

  level = 1;

  alignment!: string;

  background!: string;

  ideal!: string;

  bond!: string;

  flaw!: string;

  personalityTraits!: string[];

  proficiencies!: string[];

  languages!: string[];

  game = 'dd5';
}
