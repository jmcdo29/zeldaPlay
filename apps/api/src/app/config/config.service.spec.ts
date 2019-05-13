import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from './config.service';
import * as dotenv from 'dotenv';
jest.mock('fs');
jest.mock('path');

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(() => {
    service = null;
  })
  
  describe('prod config', () => {
    beforeAll(() => {
      process.env.NODE_ENV = 'production';
      process.env.DATABASE_URL = 'postgres://postgres:postgres@localhost:5432/testing';
      process.env.PORT = '3333';
    })
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [ConfigService],
      }).compile();
  
      service = module.get<ConfigService>(ConfigService);
    });
    it('should get the NODE_ENV', () => {
      expect(service.get('NODE_ENV')).toBe('production');
    });
    it('should return true for isProd', () => {
      expect(service.isProd()).toBe(true);
    });
  });

  describe('dev config', () => {
    jest.spyOn(dotenv, 'parse').mockReturnValue(
      {PORT: '3333', DATABASE_URL: 'postgres://postgres:postgres@localhost:5432/testing', NODE_ENV: 'dev'}
    );
    beforeEach(async () => {
      process.env.NODE_ENV = 'dev';
      const module: TestingModule = await Test.createTestingModule({
        providers: [ConfigService],
      }).compile();
  
      service = module.get<ConfigService>(ConfigService);
    });
    it('should get PORT', () => {
      expect(service.get('PORT')).toBe(3333);
    });
    it('should return dev for NODE_ENV', () => {
      expect(service.get('NODE_ENV')).toBe('dev');
    });
    it('should return false for isProd', () => {
      expect(service.isProd()).toBe(false);
    });
  });

  describe('failing config', () => {
    beforeAll(() => {
      process.env.NODE_ENV = 'production';
      process.env.PORT = '4444';
    });

    it ('should fail in a try catch', async () => {
      try {
        const module: TestingModule = await Test.createTestingModule({
          providers: [ConfigService],
        }).compile();
    
        service = module.get<ConfigService>(ConfigService);
      } catch (err) {
        expect(err).toBeTruthy();
      }
    });
  })
});
