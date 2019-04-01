import { Controller, Get, Param } from '@nestjs/common';
import { UserIdParam } from '@Parameter/userId.param';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userId')
  getPlayer(@Param() params: UserIdParam): Observable<any> {
    return this.userService.getPlayerInfo(params.userId);
  }
}
