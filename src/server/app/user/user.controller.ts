import { Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';

import { User } from '../entities/user.entity';

import { UsersService } from './user.service';

@ApiUseTags('user')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  @ApiOperation({ title: 'Login', description: 'Log the user in' })
  login() {
    return this.usersService.login();
  }

  @Post('signup')
  @ApiOperation({ title: 'Signup', description: 'Sign the new user up' })
  signup() {
    return this.usersService.signup();
  }
}
