import { Controller, Get, Res } from '@nestjs/common';

import { AppService } from './app.service';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  returnApp(@Res() res) {
    console.log('in controller');
    res.sendFile('index.html');
  }
}
