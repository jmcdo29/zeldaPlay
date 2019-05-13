import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from './config.service';
import * as fs from 'fs';

describe('ConfigService', () => {
  let service: ConfigService;
  
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
  });

  describe('dev config', () => {
    jest.spyOn(fs, 'readFileSync').mockImplementation(() => Buffer.from(
      '{"PORT": "3333", "NODE_ENV": "dev", "DATABASE_URL": "postgres://postgres:postgres@localhost:5432/testing"}'
    ));
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [ConfigService],
      }).compile();
  
      service = module.get<ConfigService>(ConfigService);
    });
    it('should get PORT', () => {
      expect(service.get('PORT')).toBe(3333);
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
