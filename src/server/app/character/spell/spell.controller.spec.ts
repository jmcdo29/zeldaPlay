import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { SpellController } from './spell.controller';
import { SpellService } from './spell.service';

const SpellServiceStub = {};

describe('Spell Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [SpellController],
      providers: [{ provide: SpellService, useValue: SpellServiceStub }]
    }).compile();
  });
  it('should be defined', () => {
    const controller: SpellController = module.get<SpellController>(
      SpellController
    );
    expect(controller).toBeDefined();
  });
});
