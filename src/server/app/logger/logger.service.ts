import { Injectable, Logger } from '@nestjs/common';
import { scribe } from 'mc-scribe';

@Injectable()
export class MyLogger extends Logger {
  error(message: string, trace: string) {
    scribe('ERROR', message);
    scribe('FINE', trace);
  }
  log(message: string) {
    scribe('INFO', message);
  }
  warn(message: string) {
    scribe('DEBUG', message);
  }
  debug(message: string) {
    scribe('DEBUG', message);
  }
  verbose(message: string) {
    scribe('FINE', message);
  }
}
