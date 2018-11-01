import { ApiModelProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Base } from '@Entity/base.entity';
import { Character } from '@Entity/character.entity';

@Entity()
export class Spell extends Base {
  idStart = '0Sp';

  @ApiModelProperty()
  @Column()
  name: string;

  @ApiModelProperty()
  @Column()
  effect: string;

  @ApiModelProperty()
  @Column('int')
  mp_use: number;

  @ApiModelProperty()
  @Column('int')
  damage: number;

  @ApiModelProperty()
  @Column({ type: 'int', nullable: true })
  number_of_hit: number;

  @ApiModelProperty()
  @Column({ nullable: true })
  modifier?: string;

  @ApiModelProperty()
  @Column()
  diety: string;

  @ApiModelProperty()
  @Column('bool')
  use_diety = false;

  @ManyToOne((type) => Character, (character) => character[this + 's'])
  @JoinColumn()
  character: Character;
}
