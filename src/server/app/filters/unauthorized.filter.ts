import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  UnauthorizedException
} from '@nestjs/common';

@Catch()
export class UnauthorizedFilter<T extends UnauthorizedException>
  implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const res = http.getResponse();
    res.status(exception.getStatus()).send(exception.message.message);
  }
}
