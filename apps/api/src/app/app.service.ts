import { Injectable } from '@nestjs/common';
import { Message } from '@tabletop-companion/api-interface';

@Injectable()
export class AppService {
  getData(data?: string): Message {
    const message = data ? `Hello ${data}.` : 'Welcome to api!';
    return { message };
  }
}
