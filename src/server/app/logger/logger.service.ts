import { Injectable, Logger } from '@nestjs/common';
import { scribe } from 'mc-scribe';

@Injectable()
export class MyLogger extends Logger {
  error(message: string, trace: string, context?: string) {
    this.printMessage('error', message, context);
    this.printStackTrace(trace);
  }
  log(message: string, context?: string) {
    this.printMessage('info', message, context);
  }
  warn(message: string, context?: string) {
    this.printMessage('warn', message, context);
  }
  debug(message: string, context?: string) {
    this.printMessage('debug', message, context);
  }
  verbose(message: string, context?: string) {
    this.printMessage('fine', message, context);
  }

  printMessage(
    level: ('debug' | 'info') | ('fine' | 'error') | ('warn'),
    message: string,
    context?: string,
    isTimeDiffEnabled: boolean = false
  ) {
    const colorStart = '\x1b';
    const reset = colorStart + '[0m';
    const green = colorStart + '[32m';
    const yellow = colorStart + '[33m';
    const nest =
      process.env.NODE_ENV === 'dev'
        ? '[' + green + 'Nest' + reset + ']'
        : '[Nest]';
    const con =
      process.env.NODE_ENV === 'dev'
        ? '[' + yellow + context + reset + ']'
        : '' + context + '';
    scribe[level](`${nest} ${process.pid} ${con} ${message}`);
  }

  printStackTrace(trace: string) {
    if (!trace) {
      return;
    }
    const colorStart = '\x1b[';
    const reset = colorStart + '0m';
    const red = colorStart + '31m';
    trace = process.env.NODE_ENV === 'dev' ? red + trace + reset : trace;
    scribe.fine(trace);
  }
}
