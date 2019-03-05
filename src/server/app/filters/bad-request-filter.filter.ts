import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter
} from '@nestjs/common';

@Catch(BadRequestException)
export class BadRequestFilter<T extends BadRequestException>
  implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    let errors = '';
    for (const error of exception.message) {
      for (const constraint of Object.values<string>(error.constraints)) {
        errors += constraint + '.\n';
      }
    }
    const http = host.switchToHttp();
    const res = http.getResponse();
    res.status(exception.getStatus()).send(errors);
  }
}
