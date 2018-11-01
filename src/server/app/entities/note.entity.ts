import { ApiModelProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Base } from '@Entity/base.entity';
import { Character } from '@Entity/character.entity';

@Entity()
export class Note extends Base {
  idStart = '00N';

  @ApiModelProperty()
  @Column()
  message: string;

  @ApiModelProperty()
  @Column()
  time: string;

  @ApiModelProperty()
  @Column('bool')
  important = false;

  @ManyToOne((type) => Character, (character) => character[this + 's'])
  @JoinColumn()
  character: Character;
}
