import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('App Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [AppController]
    }).compile();
  });
  it('should be defined', () => {
    const controller: AppController = module.get<AppController>(AppController);
    expect(controller).toBeDefined();
  });
});
