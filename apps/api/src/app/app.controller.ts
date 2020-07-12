import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { MessageDTO } from './models';
import { CookieGuard } from './guards/cookie.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(CookieGuard)
  sayHello(@Query('name') name: string, @Req() req: any): MessageDTO {
    return this.appService.getData(name || req.user?.firstName || undefined);
  }
}
