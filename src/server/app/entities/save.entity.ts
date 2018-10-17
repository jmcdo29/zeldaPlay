import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Base } from '@Entity/base.entity';
import { Character } from '@Entity/character.entity';

@Entity()
export class Save extends Base {
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
