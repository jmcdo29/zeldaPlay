import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter
} from '@nestjs/common';
import { BaseFilter } from './base.filter';

@Catch(BadRequestException)
export class BadRequestFilter<T extends BadRequestException>
  extends BaseFilter<T>
  implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    super.catch(exception, host, BadRequestFilter.name);
    let errors = '';
    for (const error of exception.message.message) {
      for (const constraint of Object.values<string>(error.constraints)) {
        errors += constraint + '.\n';
      }
    }
    const http = host.switchToHttp();
    const res = http.getResponse();
    res.status(exception.getStatus()).send(errors);
  }
}
