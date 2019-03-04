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
    const errors: Array<{ name: string; errors: string[] }> = [];
    for (const error of exception.message) {
      const nameErrors: string[] = [];
      for (const constraint of Object.values<string>(error.constraints)) {
        nameErrors.push(constraint);
      }
      errors.push({ name: error.property, errors: nameErrors });
    }
    const http = host.switchToHttp();
    const res = http.getResponse();
    res.status(exception.getStatus()).send(errors);
  }
}
