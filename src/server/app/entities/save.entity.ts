import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Character } from './character.entity';

@Entity()
export class Save {
  idStart = '0St';

  @Column('int')
  racial_bonus: number;

  @Column()
  name: string;

  @Column()
  modifier: string;

  @ManyToOne((type) => Character, (character) => character[this + 's'])
  @JoinColumn()
  character: Character;
}
