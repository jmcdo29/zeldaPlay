import { Entity } from 'typeorm';

import { Base } from './base.entity';

@Entity()
export class Element extends Base {
  idStart = '0wE';

  weapon_id: string;
  type: string;
  damage: number;
  number_of_hits: number;
}
