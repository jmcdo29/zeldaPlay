import { Column, Entity } from 'typeorm';

import { BaseCharacterObject } from './character_object.entity';

@Entity()
export class Save extends BaseCharacterObject {
  idStart = '0St';

  @Column('int')
  racial_bonus: number;

  @Column()
  name: string;

  @Column()
  modifier: string;
}
