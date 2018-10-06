import { Test, TestingModule } from '@nestjs/testing';
import { CharacterController } from './character.controller';

describe('Characters Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [CharacterController]
    }).compile();
  });
  it('should be defined', () => {
    const controller: CharacterController = module.get<CharacterController>(
      CharacterController
    );
    expect(controller).toBeDefined();
  });
});
