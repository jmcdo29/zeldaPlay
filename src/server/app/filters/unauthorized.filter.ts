import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  UnauthorizedException
} from '@nestjs/common';
import { BaseFilter } from './base.filter';

@Catch(UnauthorizedFilter)
export class UnauthorizedFilter<T extends UnauthorizedException>
  extends BaseFilter<T>
  implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    super.catch(exception, host);
    const http = host.switchToHttp();
    const res = http.getResponse();
    res.status(exception.getStatus()).send(exception.message.message);
  }
}
