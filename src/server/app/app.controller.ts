import { Controller, Get, Res } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get()
  returnApp(@Res() res) {
    res.sendFile('index.html');
  }
}
