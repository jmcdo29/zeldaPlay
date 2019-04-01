import { Module } from '@nestjs/common';
import { UserService } from '@User/user.service';
import { UserController } from './user.controller';

@Module({
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController]
})
export class UserServerModule {}
