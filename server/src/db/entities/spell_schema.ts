import { Column, Entity } from 'typeorm';

import { ISpell } from '../../interfaces/spellInterface';
import { checkNull, makeId } from '../../utils/utils';
import { BaseCharacterObject } from './base_character_object_schema';

@Entity()
export class Spell extends BaseCharacterObject {
  idStart = '0Sp';

  @Column()
  name: string;

  @Column()
  effect: string;

  @Column('int')
  mp_use: number;

  @Column('int')
  damage: number;

  @Column('int')
  number_of_hit: number;

  @Column()
  modifier?: string;

  @Column()
  diety: string;

  @Column('bool')
  use_diety = false;
}
