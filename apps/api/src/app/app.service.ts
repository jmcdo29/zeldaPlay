import { Injectable } from '@nestjs/common';
import { MessageDTO } from './models/message.graphql';

@Injectable()
export class AppService {
  getData(data?: string): MessageDTO {
    const message = data ? `Hello, ${data}!` : 'Welcome to api!';
    return { message };
  }
}
