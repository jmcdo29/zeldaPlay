import { MiddlewareModule } from './middleware.module';
import { Test } from '@nestjs/testing';

describe('#MiddlewareModule', () => {
  beforeAll(() => {
    process.env.NODE_ENV = 'test';
  });

  it('middleware module should be truthy', () => {
    expect(MiddlewareModule).toBeTruthy();
  });
  it('consumer', async () => {
    const module = await Test.createTestingModule({
      imports: [MiddlewareModule]
    }).compile();
    const mwMod = module.get<MiddlewareModule>(MiddlewareModule);
    mwMod.configure({
      apply: jest.fn().mockReturnThis(),
      forRoutes: jest.fn()
    } as any);
  });
});
