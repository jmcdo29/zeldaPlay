import { f } from '@marcj/marshal';
import { CharacterInsertData } from '@tabletop-companion/api-interface';
import { CustomId } from '../../validators';

export class CharacterInsertDataDTO implements CharacterInsertData {
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

  @f
  isDead: boolean = false;

  @f.validator(CustomId('USR'))
  playerId!: string;

  @f
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

  @f
  game: string = 'dd5';
}
