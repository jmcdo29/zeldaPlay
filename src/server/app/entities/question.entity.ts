import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';

import { Utils } from '../utils/utils';

@Entity()
export class Question {
  @PrimaryColumn({
    type: 'text',
    unique: true
  })
  id: string;

  @Column()
  question: string;

  @BeforeInsert()
  createId() {
    this.id = '0rQ' + Utils.makeId(9);
  }
}
