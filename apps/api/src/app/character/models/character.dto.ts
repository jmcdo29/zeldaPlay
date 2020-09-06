import { Character } from '@tabletop-companion/api-interface';
import { f } from '@marcj/marshal';
import { CustomId } from '../../validators';

export class CharacterDTO implements Character {
  @f.validator(CustomId('CHR'))
  id!: string;

  @f
  name!: string;

  @f
  race!: string;

  @f
  subrace!: string;

  @f
  experience!: number;

  @f
  maxHealth!: number;

  @f
  health!: number;

  @f.optional()
  isDead: boolean = false;

  @f
  playerId!: string;

  @f.optional()
  level: number = 1;

  @f
  alignment!: string;

  @f
  background!: string;

  @f
  ideal!: string;

  @f
  bond!: string;

  @f
  flaw!: string;

  @f.array(String)
  personalityTraits!: string[];

  @f.array(String)
  proficiencies!: string[];

  @f.array(String)
  languages!: string[];

  @f.optional()
  game: string = 'dd5';
}
