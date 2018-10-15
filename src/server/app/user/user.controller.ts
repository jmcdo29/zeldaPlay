import { Body, Controller, Post } from '@nestjs/common';
import { ApiImplicitBody, ApiOperation, ApiUseTags } from '@nestjs/swagger';

import { User } from '../entities/user.entity';

import { NewUserDTO } from './interfaces/new_user.dto';
import { UserDTO } from './interfaces/user.dto';
import { UserPipe } from './user.pipe';
import { UsersService } from './user.service';

@ApiUseTags('user')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  @ApiOperation({ title: 'Login', description: 'Log the user in' })
  @ApiImplicitBody({ name: 'user', type: UserDTO })
  async login(@Body('user') user: UserDTO): Promise<User> {
    return this.usersService.login(user);
  }

  @Post('signup')
  @ApiOperation({ title: 'Signup', description: 'Sign the new user up' })
  @ApiImplicitBody({ name: 'user', type: NewUserDTO })
  async signup(@Body('user', UserPipe) user: NewUserDTO): Promise<User> {
    return this.usersService.signup(user);
  }
}
