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
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  getAccount(@Param() accountId: any): Observable<any> {
    return of();
  }

  @Post('/signup')
  signup(@Body() signupBody: any): Observable<any> {
    return of();
  }

  @Post('/login')
  login(@Body() loginBody: any): Observable<any> {
    return of();
  }

  @Patch('/update/:id')
  updateAccount(
    @Body() updateBody: any,
    @Param() updateParam: any
  ): Observable<any> {
    return of();
  }

  @Delete('/:id')
  deactivateAccount(@Param() accountId: any): Observable<any> {
    return of();
  }
}
