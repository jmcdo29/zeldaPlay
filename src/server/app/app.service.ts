import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  root(): string {
    console.log('in service');
    return 'Hello';
  }

}
