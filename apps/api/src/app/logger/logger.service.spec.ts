import { Test } from '@nestjs/testing';
import { LOGGER_MODULE_OPTIONS } from './logger.constants';
import { LoggerService } from './logger.service';

jest.mock('mc-scribe').enableAutomock();

const shouldLog = (level: string): string => `Should log ${level}`;
const stackTrace = 'Stack Trace';

describe.each([
  [
    {
      provide: LOGGER_MODULE_OPTIONS,
      useValue: {
        context: '',
      },
    },
  ],
  [
    {
      provide: LOGGER_MODULE_OPTIONS,
      useValue: {
        context: '',
      },
    },
  ],
])('LoggerModule LoggerService', (loggerOptions) => {
  let service: LoggerService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [LoggerService, loggerOptions],
    }).compile();
    service = await module.resolve<LoggerService>(LoggerService);
  });
  it('should have a defined service', () => {
    expect(service).toBeDefined();
    expect((service as any).context).toBe(loggerOptions.useValue.context);
  });
  describe.each([['dev'], ['development'], ['prod'], ['production']])(
    '%s env',
    (env) => {
      beforeAll(() => {
        process.env.NODE_ENV = env;
      });
      describe.each([['TEST'], ['']])('%s context', (context: string) => {
        it.each([
          ['log', 'logs here'],
          ['warn', 'warning!'],
          ['debug', 'Debug'],
          ['debug', { debug: 'DEBUG' }],
          ['verbose', 'verbose!'],
        ])(shouldLog('%s'), (logLevel: string, logString: any) => {
          service[logLevel](logString, context);
        });
        it.each([
          ['Error!', stackTrace],
          ['Error!', ''],
        ])(shouldLog('error'), (logString, stack) => {
          service.error(logString, stack, context);
        });
      });
    },
  );
});
