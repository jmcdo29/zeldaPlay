import { Controller, Get, Req, Session } from '@nestjs/common';

import { Message } from '@tabletop-companion/api-interface';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getData(@Session() session: any): Message {
    console.log(session);
    return this.appService.getData();
  }
}
