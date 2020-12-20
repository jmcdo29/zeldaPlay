import { Character } from '@tabletop-companion/api-interface';
import { t } from '@deepkit/type';
import { CustomId } from '../../validators';

export class CharacterDTO implements Character {
  @t.validator(CustomId('CHR'))
  id!: string;

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

  @t.optional
  isDead: boolean = false;

  @t
  playerId!: string;

  @t.optional
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

  @t.optional
  game: string = 'dd5';
}
