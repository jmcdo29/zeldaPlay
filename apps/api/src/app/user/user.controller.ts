import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { Observable, of } from 'rxjs';

import {
  LoginBody,
  SignupBody,
  UpdateBody,
  UserId
} from '@tabletop-companion/api-interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  getAccount(@Param() userId: UserId): Observable<any> {
    return this.userService.getAccount(userId);
  }

  @Post('/signup')
  signup(@Body() signupBody: SignupBody): Observable<any> {
    return this.userService.signup(signupBody);
  }

  @Post('/login')
  login(@Body() loginBody: LoginBody): Observable<any> {
    return this.userService.login(loginBody);
  }

  @Patch('/update/:id')
  updateAccount(
    @Body() updateBody: UpdateBody,
    @Param() userId: UserId
  ): Observable<any> {
    return this.userService.update(updateBody, userId);
  }

  @Delete('/:id')
  deactivateAccount(@Param() userId: UserId): Observable<any> {
    return this.userService.delete(userId);
  }
}
