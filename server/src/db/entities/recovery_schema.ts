import { Column, Entity } from 'typeorm';

import { Base } from './base_schema';

export class Recovery extends Base {
  idStart = '00R';

  @Column()
  question: string;

  @Column()
  answer: string;

  @Column()
  user_id: string;
}
