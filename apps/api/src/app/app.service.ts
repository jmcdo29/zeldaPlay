import { Injectable } from '@nestjs/common';
import { Message } from '@tabletop-companion/api-interface';

@Injectable()
export class AppService {
  getData(data?: string): Message {
    return { message: data || 'Welcome to api!' };
  }
}
