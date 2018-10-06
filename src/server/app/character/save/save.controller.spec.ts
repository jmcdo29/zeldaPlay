import { Test, TestingModule } from '@nestjs/testing';
import { SaveController } from './save.controller';

describe('Save Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [SaveController]
    }).compile();
  });
  it('should be defined', () => {
    const controller: SaveController = module.get<SaveController>(
      SaveController
    );
    expect(controller).toBeDefined();
  });
});
