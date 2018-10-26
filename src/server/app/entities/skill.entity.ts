import { ApiModelProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Base } from '@Entity/base.entity';
import { Character } from '@Entity/character.entity';

@Entity()
export class Skill extends Base {
  idStart = '00S';

  @ApiModelProperty()
  @Column('bool')
  trained = false;

  @ApiModelProperty()
  @Column()
  name: string;

  @ApiModelProperty()
  @Column('int')
  ranks: number;

  @ApiModelProperty()
  @Column({ type: 'text', nullable: true })
  modifier: string;

  @ApiModelProperty()
  @Column({ type: 'int', nullable: true })
  racial_modifier?: number;

  @ApiModelProperty()
  @Column({ type: 'int', nullable: true })
  item_modifier?: number;

  @ApiModelProperty()
  @Column({ type: 'int', nullable: true })
  misc_modifier?: number;

  @ApiModelProperty()
  @Column()
  skill_type: string;

  @ManyToOne((type) => Character, (character) => character[this + 's'])
  @JoinColumn()
  character: Character;
}
