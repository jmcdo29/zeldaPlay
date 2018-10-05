import { Column, Entity } from 'typeorm';

import { BaseCharacterObject } from './base_character_object_schema';

@Entity()
export class Skill extends BaseCharacterObject {
  idStart = '00S';

  @Column('bool')
  trained = false;

  @Column()
  name: string;

  @Column('int')
  ranks: number;

  @Column({ type: 'text', nullable: true })
  modifier: string;

  @Column({ type: 'int', nullable: true })
  racial_modifier?: number;

  @Column({ type: 'int', nullable: true })
  item_modifier?: number;

  @Column({ type: 'int', nullable: true })
  misc_modifier?: number;

  @Column()
  skill_type: string;
}
