import {
  BeforeInsert,
  CreateDateColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';

import { makeId } from '../utils/utils';
import { User } from './user_schema';

export abstract class Base {
  abstract idStart;

  @PrimaryColumn({
    unique: true
  })
  id: string;

  @ManyToOne((type) => User)
  last_modified_by: User;

  @UpdateDateColumn({ type: 'timestamp without time zone' })
  last_modified: string;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  created_at: string;

  @BeforeInsert()
  createId() {
    this.id = this.idStart + makeId(9);
  }
}
