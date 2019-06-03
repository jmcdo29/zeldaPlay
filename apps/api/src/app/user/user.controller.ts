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

import { LoginBody, UserId } from '@tabletop-companion/api-interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  getAccount(@Param() userId: UserId): Observable<any> {
    return of();
  }

  @Post('/signup')
  signup(@Body() signupBody: any): Observable<any> {
    return of();
  }

  @Post('/login')
  login(@Body() loginBody: LoginBody): Observable<any> {
    return of();
  }

  @Patch('/update/:id')
  updateAccount(
    @Body() updateBody: any,
    @Param() userId: UserId
  ): Observable<any> {
    return of();
  }

  @Delete('/:id')
  deactivateAccount(@Param() userId: UserId): Observable<any> {
    return of();
  }
}
