import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';

import { CharacterController } from '@Character/character.controller';
import { CharacterService } from '@Character/character.service';

const CharacterServiceStub = {};

describe('Characters Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [CharacterController],
      providers: [{ provide: CharacterService, useValue: CharacterServiceStub }]
    }).compile();
  });
  it('should be defined', () => {
    const controller: CharacterController = module.get<CharacterController>(
      CharacterController
    );
    expect(controller).toBeDefined();
  });
});
