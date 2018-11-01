import { ApiModelProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Base } from '@Entity/base.entity';
import { Character } from '@Entity/character.entity';

@Entity()
export class Save extends Base {
  idStart = '0St';

  @ApiModelProperty()
  @Column('int')
  racial_bonus: number;

  @ApiModelProperty()
  @Column()
  name: string;

  @ApiModelProperty()
  @Column()
  modifier: string;

  @ManyToOne((type) => Character, (character) => character[this + 's'])
  @JoinColumn()
  character: Character;
}
