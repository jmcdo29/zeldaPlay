import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Character } from './character.entity';

@Entity()
export class Weapon {
  idStart: '00W';

  @Column()
  name: string;

  @Column('int')
  damage: number;

  @Column({ type: 'int', nullable: true })
  number_of_hits: number;

  @Column()
  crit_range: string;

  @Column('int')
  crit_multiplier: number;

  @Column()
  type: string;

  @Column()
  modifier: string;

  @Column({ type: 'int', nullable: true })
  range: number;

  @Column({ type: 'int', nullable: true })
  ammo: number;

  @ManyToOne((type) => Character, (character) => character[this + 's'])
  @JoinColumn()
  character: Character;
}
