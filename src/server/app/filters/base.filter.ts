import { ArgumentsHost, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { scribe } from 'mc-scribe';

export class BaseFilter<T extends HttpException> extends BaseExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    scribe('ERROR', exception.message);
    scribe('FINE', exception);
  }
}
