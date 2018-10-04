import { Column, Entity } from 'typeorm';

import { BaseCharacterObject } from './base_character_object_schema';

import { Character } from './character_schema';

@Entity()
export class Note extends BaseCharacterObject {
  idStart = '00N';

  @Column()
  message: string;

  @Column()
  time: string;

  @Column('bool')
  important: boolean;
}
