import { Module } from '@nestjs/common';

import { DbModule } from '@Db/db.module';
import { UserService } from '@User/user.service';
import { DbUserService } from './db-user/db-user.service';

@Module({
  imports: [DbModule],
  providers: [UserService, DbUserService],
  exports: [UserService]
})
export class UserModule {}
