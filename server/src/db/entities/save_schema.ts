import { Column, Entity } from 'typeorm';

import { BaseCharacterObject } from './base_character_object_schema';

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
