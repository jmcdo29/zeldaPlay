import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Base } from '@Entity/base.entity';
import { Character } from '@Entity/character.entity';

@Entity()
export class Spell extends Base {
  idStart = '0Sp';

  @Column()
  name: string;

  @Column()
  effect: string;

  @Column('int')
  mp_use: number;

  @Column('int')
  damage: number;

  @Column({ type: 'int', nullable: true })
  number_of_hit: number;

  @Column({ nullable: true })
  modifier?: string;

  @Column()
  diety: string;

  @Column('bool')
  use_diety = false;

  @ManyToOne((type) => Character, (character) => character[this + 's'])
  @JoinColumn()
  character: Character;
}
