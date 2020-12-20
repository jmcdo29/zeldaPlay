import { t } from '@deepkit/type';
import { CharacterInsertData } from '@tabletop-companion/api-interface';
import { CustomId } from '../../validators';

export class CharacterInsertDataDTO implements CharacterInsertData {
  @t
  name!: string;

  @t
  race!: string;

  @t
  subrace!: string;

  @t
  experience!: number;

  @t
  maxHealth!: number;

  @t
  health!: number;

  @t
  isDead: boolean = false;

  @t.validator(CustomId('USR'))
  playerId!: string;

  @t
  level: number = 1;

  @t
  alignment!: string;

  @t
  background!: string;

  @t
  ideal!: string;

  @t
  bond!: string;

  @t
  flaw!: string;

  @t.array(String)
  personalityTraits!: string[];

  @t.array(String)
  proficiencies!: string[];

  @t.array(String)
  languages!: string[];

  @t
  game: string = 'dd5';
}
