import { Column, Entity } from 'typeorm';

import { BaseCharacterObject } from './base_character_object_schema';

@Entity()
export class Skill extends BaseCharacterObject {
  idStart = '00S';

  @Column('bool')
  trained: boolean;

  @Column()
  name: string;

  @Column('int')
  ranks: number;

  @Column()
  modifier: string;

  @Column('int')
  racial_modifier?: number;

  @Column('int')
  item_modifier?: number;

  @Column('int')
  misc_modifier?: number;

  @Column()
  skill_type: string;
}
