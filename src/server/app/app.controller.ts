import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiImplicitParam, ApiOperation, ApiProduces } from '@nestjs/swagger';
import { DocParam } from '@Parameter/index';

@Controller()
export class AppController {
  @Get()
  @ApiOperation({
    title: 'Get App',
    description: 'The base path where the angular application is sent from.'
  })
  @ApiProduces('text/html')
  returnApp(@Res() res: any) {
    console.log('trying to send index.html');
    res.sendFile('build/client/index.html');
  }

  @Get('/docs/:type')
  @ApiOperation({
    title: 'Get documentation',
    description:
      'Gets the client or the server side documentation of the application'
  })
  @ApiProduces('text/html')
  @ApiImplicitParam({ name: 'type', type: 'string', required: true })
  getDocs(@Param() params: DocParam, @Res() res: any) {
    res.sendFile(`documenation/${params.clientOrServer}/index.html`);
  }
}
