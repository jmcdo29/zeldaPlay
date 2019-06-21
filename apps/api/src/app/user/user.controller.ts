import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

import { User, UserId } from '@tabletop-companion/api-interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  @UseGuards(AuthGuard())
  getUser(@Param() userId: UserId): Observable<any> {
    return this.userService.getById(userId);
  }

  @Patch('/update/:id')
  @UseGuards(AuthGuard())
  updateAccount(
    @Body() updateBody: Partial<User>,
    @Param() userId: UserId
  ): Observable<any> {
    return this.userService.updateUser(updateBody, userId);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deactivateAccount(@Param() userId: UserId): Observable<any> {
    return this.userService.deleteUser(userId);
  }
}
