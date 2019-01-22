import { Module } from '@nestjs/common';

import { AuthModule } from '@Auth/auth.module';
import { DbModule } from '../db/db.module';
import { UtilsModule } from '../utils/utils.module';

@Module({
  imports: [AuthModule, DbModule, UtilsModule],
  exports: [AuthModule, DbModule, UtilsModule]
})
export class SharedModule {}
