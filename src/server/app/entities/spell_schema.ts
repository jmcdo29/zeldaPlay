import { Column, Entity } from 'typeorm';

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

  @Column({ type: 'int', nullable: true })
  number_of_hit: number;

  @Column({ nullable: true })
  modifier?: string;

  @Column()
  diety: string;

  @Column('bool')
  use_diety = false;
}
