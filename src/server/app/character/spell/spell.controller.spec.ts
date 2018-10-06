import { Test, TestingModule } from '@nestjs/testing';
import { SpellController } from './spell.controller';

describe('Spell Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [SpellController]
    }).compile();
  });
  it('should be defined', () => {
    const controller: SpellController = module.get<SpellController>(
      SpellController
    );
    expect(controller).toBeDefined();
  });
});
