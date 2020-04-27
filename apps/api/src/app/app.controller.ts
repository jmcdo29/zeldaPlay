import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { MessageDTO } from './models';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  sayHello(@Query('name') name: string): MessageDTO {
    return this.appService.getData(name);
  }
}
