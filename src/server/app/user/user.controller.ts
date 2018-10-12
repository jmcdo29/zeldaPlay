import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';

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
  async login(@Body() user: UserDTO): Promise<User> {
    return this.usersService.login(user);
  }

  @Post('signup')
  @ApiOperation({ title: 'Signup', description: 'Sign the new user up' })
  @UsePipes(UserPipe)
  async signup(@Body() user: NewUserDTO): Promise<User> {
    return this.usersService.signup(user);
  }
}
