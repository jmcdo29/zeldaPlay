import { Test, TestingModule } from '@nestjs/testing';
import { MyLogger } from './logger.service';

jest.mock('mc-scribe').enableAutomock();

describe('LoggerService', () => {
  let service: MyLogger;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyLogger]
    }).compile();
    service = module.get<MyLogger>(MyLogger);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
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
  });
  it('should log verbose', () => {
    service.verbose('verbose!');
  });
});
