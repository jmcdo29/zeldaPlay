import { Module } from '@nestjs/common';
import { DbService } from './db.service';

@Module({
  providers: [
    {
      provide: 'DbService',
      useFactory: (schema: string) => new DbService(schema)
    }
  ]
})
export class DbModule {}
