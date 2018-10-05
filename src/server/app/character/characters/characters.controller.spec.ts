import { Test, TestingModule } from '@nestjs/testing';
import { CharactersController } from './characters.controller';

describe('Characters Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [CharactersController]
    }).compile();
  });
  it('should be defined', () => {
    const controller: CharactersController = module.get<CharactersController>(
      CharactersController
    );
    expect(controller).toBeDefined();
  });
});
