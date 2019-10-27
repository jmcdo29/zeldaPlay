import { Inject, Injectable, Optional, Scope } from '@nestjs/common';
import { scribe } from 'mc-scribe';
import { LoggerModuleOptions } from './interfaces/logger-options.interface';
import { LOGGER_MODULE_OPTIONS } from './logger.constants';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService {
  private context: string;

  private printMyMessage(
    level: 'debug' | 'info' | 'fine' | 'error' | 'warn',
    message: string | object,
    context?: string,
  ) {
    context = context ? '[' + context + ']' : '';
    const colorStart = '\x1b';
    const reset = colorStart + '[0m';
    const green = colorStart + '[32m';
    const yellow = colorStart + '[33m';
    const nest = this.useColor() ? green + '[Nest]' + reset : '[Nest]';
    const con = context
      ? this.useColor()
        ? yellow + context + reset
        : context
      : '';
    if (typeof message === 'object') {
      scribe[level](`${nest} ${process.pid} ${con} `, message);
    } else {
      scribe[level](`${nest} ${process.pid} ${con} ${message}`);
    }
  }

  private printMyStackTrace(trace: string) {
    if (!trace) {
      return;
    }
    const colorStart = '\x1b[';
    const reset = colorStart + '0m';
    const red = colorStart + '31m';
    trace = this.useColor() ? red + trace + reset : trace;
    scribe.fine(trace);
  }

  private useColor(): boolean {
    return (
      process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'development'
    );
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
    this.printMyMessage('error', message, context);
    this.printMyStackTrace(trace);
  }
  log(message: string | object, context?: string) {
    context = context ? context : this.context;
    this.printMyMessage('info', message, context);
  }
  warn(message: string | object, context?: string) {
    context = context ? context : this.context;
    this.printMyMessage('warn', message, context);
  }
  debug(message: string | object, context?: string) {
    context = context ? context : this.context;
    this.printMyMessage('debug', message, context);
  }
  verbose(message: string | object, context?: string) {
    context = context ? context : this.context;
    this.printMyMessage('fine', message, context);
  }
}
