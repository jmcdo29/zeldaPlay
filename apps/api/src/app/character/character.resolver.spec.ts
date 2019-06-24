import { Test, TestingModule } from '@nestjs/testing';
import { CharacterResolver } from './character.resolver';

describe('CharacterResolver', () => {
  let resolver: CharacterResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharacterResolver]
    }).compile();

    resolver = module.get<CharacterResolver>(CharacterResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
