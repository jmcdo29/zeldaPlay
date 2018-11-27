import { Column } from 'typeorm';

import { Base } from '@Entity/base.entity';

export class Recovery extends Base {
  idStart = '00R';

  @Column()
  question: string;

  @Column()
  answer: string;

  @Column()
  user_id: string;
}
