import { Controller, Get, Res } from '@nestjs/common';
import { ApiOperation, ApiProduces } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get()
  @ApiOperation({
    title: 'Get App',
    description: 'The base path where the angular application is sent from.'
  })
  @ApiProduces('text/html')
  returnApp(@Res() res) {
    res.sendFile('index.html');
  }
}
