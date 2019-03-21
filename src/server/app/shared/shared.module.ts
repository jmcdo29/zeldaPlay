import { Module } from '@nestjs/common';

import { AuthModule } from '@Auth/auth.module';
import { DbModule } from '../db/db.module';

@Module({
  imports: [AuthModule, DbModule],
  exports: [AuthModule, DbModule]
})
export class SharedServerModule {}
