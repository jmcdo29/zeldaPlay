import { ArgumentsHost, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { MyLogger } from '../logger/logger.service';

export class BaseFilter<T extends HttpException> extends BaseExceptionFilter {
  catch(exception: T, host: ArgumentsHost, context?: string) {
    MyLogger.error(exception.message, exception.stack, context);
  }
}
