import { Controller, Get, Req, Session } from '@nestjs/common';

import { Message } from '@tabletop-companion/api-interface';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getData(): Message {
    return this.appService.getData();
  }
}
