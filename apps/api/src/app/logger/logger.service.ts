import { Injectable, LoggerService } from '@nestjs/common';
import { scribe } from 'mc-scribe';

@Injectable()
export class MyLogger implements LoggerService {
  static error(message: string | object, trace: string, context?: string) {
    MyLogger.printMyMessage('error', message, context);
    MyLogger.printMyStackTrace(trace);
  }
  static log(message: string | object, context?: string) {
    MyLogger.printMyMessage('info', message, context);
  }
  static warn(message: string | object, context?: string) {
    MyLogger.printMyMessage('warn', message, context);
  }
  static debug(message: string | object, context?: string) {
    MyLogger.printMyMessage('debug', message, context);
  }
  static verbose(message: string | object, context?: string) {
    MyLogger.printMyMessage('fine', message, context);
  }

  private static printMyMessage(
    level: ('debug' | 'info') | ('fine' | 'error') | ('warn'),
    message: string | object,
    context?: string
  ) {
    const colorStart = '\x1b';
    const reset = colorStart + '[0m';
    const green = colorStart + '[32m';
    const yellow = colorStart + '[33m';
    const nest =
      process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'development'
        ? '[' + green + 'Nest' + reset + ']'
        : '[Nest]';
    const con = context
      ? process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'development'
        ? '[' + yellow + context + reset + ']'
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

  error(message: string, trace: string, context?: string) {
    MyLogger.error(message, trace, context);
  }
  log(message: string | object, context?: string) {
    MyLogger.log(message, context);
  }
  warn(message: string | object, context?: string) {
    MyLogger.warn(message, context);
  }
  debug(message: string | object, context?: string) {
    MyLogger.debug(message, context);
  }
  verbose(message: string | object, context?: string) {
    MyLogger.verbose(message, context);
  }
}
