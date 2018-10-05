import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService]
})
export class UserModule {}
