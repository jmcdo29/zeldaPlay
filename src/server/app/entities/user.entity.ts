import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryColumn
} from 'typeorm';

import { makeId } from '../utils/utils';
import { Character } from './character.entity';
import { Element } from './element.entity';
import { Note } from './note.entity';
import { Recovery as Answer } from './recovery.entity';
import { Save } from './save.entity';
import { Skill } from './skill.entity';
import { Spell } from './spell.entity';
import { Weapon } from './weapon.entity';

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
