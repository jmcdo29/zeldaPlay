import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { CookieGuard } from './guards/cookie.guard';
import { ReqWithUser } from './interfaces/req-with-user.interface';
import { AppControllerQuery, MessageDTO } from './models';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(CookieGuard)
  sayHello(
    @Query() { name }: AppControllerQuery,
    @Req() req: ReqWithUser,
  ): MessageDTO {
    return this.appService.getData(name || req.user?.firstName || undefined);
  }
}
