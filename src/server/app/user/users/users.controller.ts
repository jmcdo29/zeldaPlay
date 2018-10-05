import { Controller, Get, Post } from '@nestjs/common';

import { UsersService } from '../users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/login')
  login() {
    return this.usersService.login();
  }

  @Post('/signup')
  singup() {
    return this.usersService.signup();
  }
}
