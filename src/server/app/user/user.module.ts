import { Module } from '@nestjs/common';

import { UserService } from '@User/user.service';

@Module({
  providers: [UserService],
  exports: [UserService]
})
export class UserServerModule {}
