import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Character } from './character.entity';

@Entity()
export class Note {
  idStart = '00N';

  @Column()
  message: string;

  @Column()
  time: string;

  @Column('bool')
  important = false;

  @ManyToOne((type) => Character, (character) => character[this + 's'])
  @JoinColumn()
  character: Character;
}
