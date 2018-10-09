import { Column, Entity } from 'typeorm';

import { BaseCharacterObject } from './character_object.entity';

@Entity()
export class Note extends BaseCharacterObject {
  idStart = '00N';

  @Column()
  message: string;

  @Column()
  time: string;

  @Column('bool')
  important = false;
}
