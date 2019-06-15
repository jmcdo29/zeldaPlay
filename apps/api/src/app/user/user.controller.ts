import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { Observable } from 'rxjs';

import {
  LoginBody,
  SignupBody,
  User,
  UserId
} from '@tabletop-companion/api-interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  getUser(@Param() userId: UserId): Observable<any> {
    return this.userService.getById(userId);
  }

  @Patch('/update/:id')
  updateAccount(
    @Body() updateBody: Partial<User>,
    @Param() userId: UserId
  ): Observable<any> {
    return this.userService.update(updateBody, userId);
  }

  @Delete('/:id')
  deactivateAccount(@Param() userId: UserId): Observable<any> {
    return this.userService.delete(userId);
  }
}
