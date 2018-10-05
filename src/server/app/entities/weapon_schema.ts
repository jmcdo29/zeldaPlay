import { Column, Entity } from 'typeorm';

import { BaseCharacterObject } from './base_character_object_schema';

@Entity()
export class Weapon extends BaseCharacterObject {
  idStart: '00W';

  @Column()
  name: string;

  @Column('int')
  damage: number;

  @Column({ type: 'int', nullable: true })
  number_of_hits: number;

  @Column()
  crit_range: string;

  @Column('int')
  crit_multiplier: number;

  @Column()
  type: string;

  @Column()
  modifier: string;

  @Column({ type: 'int', nullable: true })
  range: number;

  @Column({ type: 'int', nullable: true })
  ammo: number;
}
