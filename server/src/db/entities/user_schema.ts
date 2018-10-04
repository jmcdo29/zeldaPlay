import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';

import { makeId } from '../../utils/utils';
import { Character } from './character_schema';
import { Element } from './element_schema';
import { Note } from './note_schema';
import { Recovery as Answer } from './recovery_schema';
import { Save } from './save_schema';
import { Skill } from './skill_schema';
import { Spell } from './spell_schema';
import { Weapon } from './weapon_schema';

const LMB = '.last_modified_by';

@Entity()
export class User {
  idStart = '00U';

  @PrimaryColumn({
    type: 'text',
    unique: true
  })
  id: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'text', nullable: true })
  recovery_token: string;

  @BeforeInsert()
  createId() {
    this.id = this.idStart + makeId(9);
  }
}
