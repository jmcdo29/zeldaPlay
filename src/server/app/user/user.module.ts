import { Module } from '@nestjs/common';

import { UserService } from '@User/user.service';
import { DbUserService } from './db-user/db-user.service';

@Module({
  providers: [UserService, DbUserService],
  exports: [UserService]
})
export class UserModule {}
