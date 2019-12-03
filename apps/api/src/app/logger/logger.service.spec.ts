import { Test } from '@nestjs/testing';
import { LOGGER_MODULE_OPTIONS } from './logger.constants';
import { LoggerService } from './logger.service';

jest.mock('mc-scribe').enableAutomock();

const shouldLog = (level: string): string => `Should log ${level}`;
const stackTrace = 'Stack Trace';

describe('LoggerService (no context)', () => {
  let service: LoggerService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [LoggerService],
    }).compile();
    service = await module.resolve<LoggerService>(LoggerService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should have an blank context', () => {
    expect((service as any).context).toBeFalsy();
  });
  it('should be able to log', () => {
    service.log('something');
  });
});
describe('LoggerModule LoggerService', () => {
  let service: LoggerService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        LoggerService,
        {
          provide: LOGGER_MODULE_OPTIONS,
          useValue: {
            context: 'Test',
          },
        },
      ],
    }).compile();
    service = await module.resolve<LoggerService>(LoggerService);
  });
  it('should have a defined service', () => {
    expect(service).toBeDefined();
    expect((service as any).context).toBeTruthy();
  });
  describe('dev env', () => {
    beforeAll(() => {
      process.env.NODE_ENV = 'dev';
    });
    describe('without context', () => {
      it(shouldLog('error'), () => {
        service.error('Error!', stackTrace);
      });
      it(shouldLog('log'), () => {
        service.log('logs here');
      });
      it(shouldLog('warn'), () => {
        service.warn('Warning!');
      });
      it(shouldLog('debug'), () => {
        service.debug('Debug');
        service.debug({ debug: 'DEBUG' });
      });
      it(shouldLog('verbose'), () => {
        service.verbose('verbose!');
      });
    });
    describe('with context', () => {
      it(shouldLog('error'), () => {
        service.error('Error!', stackTrace, 'TEST');
      });
      it(shouldLog('log'), () => {
        service.log('logs here', 'TEST');
      });
      it(shouldLog('warn'), () => {
        service.warn('Warning!', 'TEST');
      });
      it(shouldLog('debug'), () => {
        service.debug('Debug', 'TEST');
        service.debug({ debug: 'DEBUG' }, 'TEST');
      });
      it(shouldLog('verbose'), () => {
        service.verbose('verbose!', 'TEST');
      });
    });
  });
  describe('development env', () => {
    beforeAll(() => {
      process.env.NODE_ENV = 'development';
    });
    it(shouldLog('error'), () => {
      service.error('Error!', stackTrace);
    });
    it(shouldLog('log'), () => {
      service.log('logs here', 'Test');
    });
    it(shouldLog('warn'), () => {
      service.warn('Warning!');
    });
    it(shouldLog('debug'), () => {
      service.debug('Debug');
      service.debug({ debug: 'DEBUG' });
    });
    it(shouldLog('verbose'), () => {
      service.verbose('verbose!');
    });
  });
  describe('prod env', () => {
    beforeAll(() => {
      process.env.NODE_ENV = 'production';
    });
    it(shouldLog('error'), () => {
      service.error('Error!', stackTrace);
      service.error('ERROR!', '');
    });
    it(shouldLog('log'), () => {
      service.log('logs here', 'Test');
    });
    it(shouldLog('warn'), () => {
      service.warn('Warning!');
    });
    it(shouldLog('debug'), () => {
      service.debug('Debug');
    });
    it(shouldLog('verbose'), () => {
      service.verbose('verbose!');
    });
  });
});
