import { ApiModelProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Base } from '@Entity/base.entity';
import { Character } from '@Entity/character.entity';

@Entity()
export class Weapon extends Base {
  idStart: '00W';

  @ApiModelProperty()
  @Column()
  name: string;

  @ApiModelProperty()
  @Column('int')
  damage: number;

  @ApiModelProperty()
  @Column({ type: 'int', nullable: true })
  number_of_hits: number;

  @ApiModelProperty()
  @Column()
  crit_range: string;

  @ApiModelProperty()
  @Column('int')
  crit_multiplier: number;

  @ApiModelProperty()
  @Column()
  type: string;

  @ApiModelProperty()
  @Column()
  modifier: string;

  @ApiModelProperty()
  @Column({ type: 'int', nullable: true })
  range: number;

  @ApiModelProperty()
  @Column({ type: 'int', nullable: true })
  ammo: number;

  @ManyToOne((type) => Character, (character) => character[this + 's'])
  @JoinColumn()
  character: Character;
}
