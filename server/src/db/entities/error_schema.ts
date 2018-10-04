import { BeforeInsert, Column, Entity, UpdateDateColumn } from 'typeorm';

import { Base } from './base_schema';

@Entity()
export class DBError extends Base {
  idStart = '00E';

  @Column()
  message: string;

  @Column({
    nullable: true
  })
  code: string;

  @UpdateDateColumn()
  error_time: string;

  @Column()
  stack: string;
}
