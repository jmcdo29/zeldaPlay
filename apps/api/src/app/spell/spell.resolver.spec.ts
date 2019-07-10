import { Test, TestingModule } from '@nestjs/testing';
import { SpellResolver } from './spell.resolver';

describe('SpellResolver', () => {
  let resolver: SpellResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpellResolver]
    }).compile();

    resolver = module.get<SpellResolver>(SpellResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
