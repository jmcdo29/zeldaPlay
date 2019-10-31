import { Test } from '@nestjs/testing';
import { LoggerModule } from './logger.module';
import { LoggerService } from './logger.service';

jest.mock('mc-scribe').enableAutomock();

describe('LoggerService', () => {
  let service: LoggerService;

  beforeAll(async () => {
    service = new LoggerService({ context: 'TEST' });
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should have context TEST', () => {
    expect((service as any).context).toBe('TEST');
  });
  describe('dev env', () => {
    beforeAll(() => {
      process.env.NODE_ENV = 'dev';
    });
    describe('without context', () => {
      it('should log error', () => {
        service.error('Error!', 'Stack trace');
      });
      it('should log log', () => {
        service.log('logs here');
      });
      it('should log warn', () => {
        service.warn('Warning!');
      });
      it('should log debug messages', () => {
        service.debug('Debug');
        service.debug({ debug: 'DEBUG' });
      });
      it('should log verbose', () => {
        service.verbose('verbose!');
      });
    });
    describe('with context', () => {
      it('should log error', () => {
        service.error('Error!', 'Stack trace', 'TEST');
      });
      it('should log log', () => {
        service.log('logs here', 'TEST');
      });
      it('should log warn', () => {
        service.warn('Warning!', 'TEST');
      });
      it('should log debug messages', () => {
        service.debug('Debug', 'TEST');
        service.debug({ debug: 'DEBUG' }, 'TEST');
      });
      it('should log verbose', () => {
        service.verbose('verbose!', 'TEST');
      });
    });
  });
  describe('development env', () => {
    beforeAll(() => {
      process.env.NODE_ENV = 'development';
    });
    it('should log error', () => {
      service.error('Error!', 'Stack trace');
    });
    it('should log log', () => {
      service.log('logs here', 'Test');
    });
    it('should log warn', () => {
      service.warn('Warning!');
    });
    it('should log debug messages', () => {
      service.debug('Debug');
      service.debug({ debug: 'DEBUG' });
    });
    it('should log verbose', () => {
      service.verbose('verbose!');
    });
  });
  describe('prod env', () => {
    beforeAll(() => {
      process.env.NODE_ENV = 'production';
    });
    it('should log error', () => {
      service.error('Error!', 'Stack trace');
      service.error('ERROR!', '');
    });
    it('should log log', () => {
      service.log('logs here', 'Test');
    });
    it('should log warn', () => {
      service.warn('Warning!');
    });
    it('should log debug messages', () => {
      service.debug('Debug');
    });
    it('should log verbose', () => {
      service.verbose('verbose!');
    });
  });
});
describe('LoggerService (no context)', () => {
  let service: LoggerService;

  beforeAll(async () => {
    service = new LoggerService();
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should have an blank context', () => {
    expect((service as any).context).toBeFalsy();
  });
});
describe('LoggerModule LoggerService', () => {
  let service: LoggerService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [LoggerModule.forFeature({ context: 'TEST' })],
    }).compile();
    await module.init();
    service = await module.resolve<LoggerService>(LoggerService);
  });
  it('should have a defined service', () => {
    expect(service).toBeDefined();
  });
  describe('dev env', () => {
    beforeAll(() => {
      process.env.NODE_ENV = 'dev';
    });
    describe('without context', () => {
      it('should log error', () => {
        service.error('Error!', 'Stack trace');
      });
      it('should log log', () => {
        service.log('logs here');
      });
      it('should log warn', () => {
        service.warn('Warning!');
      });
      it('should log debug messages', () => {
        service.debug('Debug');
        service.debug({ debug: 'DEBUG' });
      });
      it('should log verbose', () => {
        service.verbose('verbose!');
      });
    });
    describe('with context', () => {
      it('should log error', () => {
        service.error('Error!', 'Stack trace', 'TEST');
      });
      it('should log log', () => {
        service.log('logs here', 'TEST');
      });
      it('should log warn', () => {
        service.warn('Warning!', 'TEST');
      });
      it('should log debug messages', () => {
        service.debug('Debug', 'TEST');
        service.debug({ debug: 'DEBUG' }, 'TEST');
      });
      it('should log verbose', () => {
        service.verbose('verbose!', 'TEST');
      });
    });
  });
  describe('development env', () => {
    beforeAll(() => {
      process.env.NODE_ENV = 'development';
    });
    it('should log error', () => {
      service.error('Error!', 'Stack trace');
    });
    it('should log log', () => {
      service.log('logs here', 'Test');
    });
    it('should log warn', () => {
      service.warn('Warning!');
    });
    it('should log debug messages', () => {
      service.debug('Debug');
      service.debug({ debug: 'DEBUG' });
    });
    it('should log verbose', () => {
      service.verbose('verbose!');
    });
  });
  describe('prod env', () => {
    beforeAll(() => {
      process.env.NODE_ENV = 'production';
    });
    it('should log error', () => {
      service.error('Error!', 'Stack trace');
      service.error('ERROR!', '');
    });
    it('should log log', () => {
      service.log('logs here', 'Test');
    });
    it('should log warn', () => {
      service.warn('Warning!');
    });
    it('should log debug messages', () => {
      service.debug('Debug');
    });
    it('should log verbose', () => {
      service.verbose('verbose!');
    });
  });
});
