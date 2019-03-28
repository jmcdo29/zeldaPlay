import { Injectable, Logger } from '@nestjs/common';
import { scribe } from 'mc-scribe';

@Injectable()
export class MyLogger extends Logger {
  error(message: string, trace: string, context?: string) {
    this.printMessage('ERROR', message, context);
    this.printStackTrace(trace);
  }
  log(message: string, context?: string) {
    this.printMessage('INFO', message, context);
  }
  warn(message: string, context?: string) {
    this.printMessage('DEBUG', message, context);
  }
  debug(message: string, context?: string) {
    this.printMessage('DEBUG', message, context);
  }
  verbose(message: string, context?: string) {
    this.printMessage('FINE', message, context);
  }

  printMessage(
    level: ('DEBUG' | 'INFO') | ('FINE' | 'ERROR'),
    message: string,
    context?: string,
    isTimeDiffEnabled: boolean = false
  ) {
    const colorStart = '\x1b[';
    const reset = '0m';
    const green = '32m';
    const yellow = '33m';
    const nest =
      process.env.NODE_ENV === 'dev'
        ? '[' + colorStart + green + 'Nest' + colorStart + reset + ']'
        : '[Nest]';
    const con =
      process.env.NODE_ENV === 'dev'
        ? '[' +
          colorStart +
          yellow +
          '' +
          context +
          '' +
          colorStart +
          reset +
          ']'
        : '' + context + '';
    scribe(level, `${nest} ${process.pid}\t${con} ${message}`);
  }

  printStackTrace(trace: string) {
    if (!trace) {
      return;
    }
    const colorStart = '\x1b[';
    const reset = '0m';
    const red = '31m';
    trace =
      process.env.NODE_ENV === 'dev'
        ? colorStart + red + trace + colorStart + reset
        : trace;
    scribe('FINE', trace);
  }
}
