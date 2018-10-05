import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller('app')
export class AppController {

  constructor (private readonly appService: AppService) {}

  @Get('/hello')
  returnApp() {
    console.log('in controller');
    return this.appService.root();
  }
}
