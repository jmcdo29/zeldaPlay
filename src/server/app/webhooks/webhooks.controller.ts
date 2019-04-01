import { Body, Controller, Headers, HttpCode, Post } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';

@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly whService: WebhooksService) {}

  @Post('/heroku')
  @HttpCode(204)
  herokuWebhook(
    @Headers('Heroku-Webhook-Hmac-SHA256') header: string,
    @Body() body: any
  ) {
    this.whService.herokuWebhook(header, body);
  }
}
