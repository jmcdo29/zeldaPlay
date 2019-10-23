import { Inject, Injectable, Optional, Scope } from '@nestjs/common';
import { scribe } from 'mc-scribe';
import { LoggerModuleOptions } from './interfaces/logger-options.interface';
import { LOGGER_MODULE_OPTIONS } from './logger.constants';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService {
  private context: string;

  static error(message: string | object, trace: string, context?: string) {
    LoggerService.printMyMessage('error', message, context);
    LoggerService.printMyStackTrace(trace);
  }
  static log(message: string | object, context?: string) {
    LoggerService.printMyMessage('info', message, context);
  }
  static warn(message: string | object, context?: string) {
    LoggerService.printMyMessage('warn', message, context);
  }
  static debug(message: string | object, context?: string) {
    LoggerService.printMyMessage('debug', message, context);
  }
  static verbose(message: string | object, context?: string) {
    LoggerService.printMyMessage('fine', message, context);
  }

  private static printMyMessage(
    level: ('debug' | 'info') | ('fine' | 'error') | ('warn'),
    message: string | object,
    context?: string,
  ) {
    const colorStart = '\x1b';
    const reset = colorStart + '[0m';
    const green = colorStart + '[32m';
    const yellow = colorStart + '[33m';
    const nest =
      process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'development'
        ? green + '[' + 'Nest' + ']' + reset
        : '[Nest]';
    const con = context
      ? process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'development'
        ? yellow + '[' + context + ']' + reset
        : '[' + context + ']'
      : '';
    if (typeof message === 'object') {
      scribe[level](`${nest} ${process.pid} ${con} ` + JSON.stringify(message));
    } else {
      scribe[level](`${nest} ${process.pid} ${con} ${message}`);
    }
  }

  private static printMyStackTrace(trace: string) {
    if (!trace) {
      return;
    }
    const colorStart = '\x1b[';
    const reset = colorStart + '0m';
    const red = colorStart + '31m';
    trace =
      process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'development'
        ? red + trace + reset
        : trace;
    scribe.fine(trace);
  }

  constructor(
    @Optional()
    @Inject(LOGGER_MODULE_OPTIONS)
    loggerOptions?: LoggerModuleOptions,
  ) {
    this.context = (loggerOptions && loggerOptions.context) || '';
  }

  error(message: string, trace: string, context?: string) {
    context = context ? context : this.context;
    LoggerService.error(message, trace, context);
  }
  log(message: string | object, context?: string) {
    context = context ? context : this.context;
    LoggerService.log(message, context);
  }
  warn(message: string | object, context?: string) {
    context = context ? context : this.context;
    LoggerService.warn(message, context);
  }
  debug(message: string | object, context?: string) {
    context = context ? context : this.context;
    LoggerService.debug(message, context);
  }
  verbose(message: string | object, context?: string) {
    context = context ? context : this.context;
    LoggerService.verbose(message, context);
  }
}
