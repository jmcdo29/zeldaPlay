import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException
} from '@nestjs/common';
import { BaseFilter } from './base.filter';

@Catch(NotFoundException)
export class NotFoundFilter<T extends NotFoundException> extends BaseFilter<T>
  implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    super.catch(exception, host, NotFoundFilter.name);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    response.redirect('/');
  }
}
