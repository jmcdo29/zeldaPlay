import {
  ArgumentsHost,
  HttpException,
  HttpServer,
  Inject
} from '@nestjs/common';
import { BaseExceptionFilter, HTTP_SERVER_REF } from '@nestjs/core';
import { scribe } from 'mc-scribe';

export class BaseFilter<T extends HttpException> extends BaseExceptionFilter {
  constructor(@Inject(HTTP_SERVER_REF) applicationRef: HttpServer) {
    super(applicationRef);
  }
  catch(exception: T, host: ArgumentsHost) {
    scribe('ERROR', exception.message);
    scribe('FINE', exception);
  }
}
