import { Test, TestingModule } from '@nestjs/testing';
import * as dotenv from 'dotenv';
import { ConfigService } from './config.service';
jest.mock('fs');
jest.mock('path');

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(() => {
    service = null as any;
  });

  describe('process.env config', () => {
    beforeAll(() => {
      process.env.NODE_ENV = 'production';
      process.env.DATABASE_URL =
        'postgres://postgres:postgres@localhost:5432/testing';
      process.env.PORT = '3333';
      process.env.JWT_SECRET = 'itsasecret';
      process.env.RATE_LIMIT = '4040';
      process.env.SESSION_SECRET = 'itsasecert';
      process.env.REDIS_URL = 'redis://redis:redis@localhost:9999/testing';
    });
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: ConfigService,
            useFactory: () => new ConfigService({ useProcess: true }),
          },
        ],
      }).compile();

      service = module.get<ConfigService>(ConfigService);
    });
    it('should get the NODE_ENV', () => {
      expect(service.getNodeEnv()).toBe('production');
    });
    it('should return true for isProd', () => {
      expect(service.isProd()).toBe(true);
    });
    it('should return 4040 for RATE_LIMIT', () => {
      expect(service.getRateLimit()).toBe(4040);
    });
  });

  describe('.env config', () => {
    jest.spyOn(dotenv, 'parse').mockReturnValue({
      PORT: '3333',
      DATABASE_URL: 'postgres://postgres:postgres@localhost:5432/testing',
      NODE_ENV: 'dev',
      JWT_SECRET: 'itsasecret',
      SESSION_SECRET: 'itsasecret',
      REDIS_URL: 'redis://redis:redis@localhost:9999/testing',
    });
    beforeEach(async () => {
      process.env.NODE_ENV = 'dev';
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: ConfigService,
            useFactory: () => new ConfigService({ fileName: '.env' }),
          },
        ],
      }).compile();

      service = module.get<ConfigService>(ConfigService);
    });
    it('should get PORT', () => {
      expect(service.getPort()).toBe(3333);
    });
    it('should return dev for NODE_ENV', () => {
      expect(service.getNodeEnv()).toBe('dev');
    });
    it('should return false for isProd', () => {
      expect(service.isProd()).toBe(false);
    });
    it('should return 1000 for RATE_LIMIT', () => {
      expect(service.getRateLimit()).toBe(1000);
    });
    it('should return a redis url', () => {
      expect(service.getRedisUrl()).toBe(
        'redis://redis:redis@localhost:9999/testing',
      );
    });
    it('should return the jwt secret', () => {
      expect(service.getJwtSecret()).toBe('itsasecret');
    });
    it('should return the jwt expires in', () => {
      expect(service.getJwtExpiresIn()).toBe(3600);
    });
    it('should return a session secret', () => {
      expect(service.getSessionSecret()).toBe('itsasecret');
    });
    it('should return a global prefix', () => {
      expect(service.getGlobalPrefix()).toBe('api');
    });
    it('should return a log level', () => {
      expect(service.getLogLevel()).toBe('INFO');
    });
  });

  describe('failing config', () => {
    beforeAll(() => {
      process.env.NODE_ENV = 'production';
      process.env.PORT = '4444';
      process.env.DATABASE_URL = '';
    });

    it('should fail in a try catch (no database url)', async () => {
      try {
        const module: TestingModule = await Test.createTestingModule({
          providers: [
            {
              provide: ConfigService,
              useFactory: () => new ConfigService({ useProcess: true }),
            },
          ],
        }).compile();

        service = module.get<ConfigService>(ConfigService);
      } catch (err) {
        expect(err).toBeTruthy();
        expect(err.message).toBe(
          'Config validation error: "DATABASE_URL" is not allowed to be empty',
        );
      }
    });
    it('should fail in a try catch (no parameter passed)', async () => {
      try {
        const module: TestingModule = await Test.createTestingModule({
          providers: [
            { provide: ConfigService, useFactory: () => new ConfigService({}) },
          ],
        }).compile();

        service = module.get<ConfigService>(ConfigService);
      } catch (err) {
        expect(err).toBeTruthy();
        expect(err.message).toBe(
          'Missing configuration options.' +
            ' If using process.env variables, please mark useProcess as "true".' +
            ' Otherwise, please provide and env file.',
        );
      }
    });
  });
});
