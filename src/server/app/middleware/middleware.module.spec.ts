import { MiddlewareModule } from './middleware.module';

describe('#MiddlewareModule', () => {
  beforeAll(() => {
    process.env.NODE_ENV = 'test';
  });

  test('middleware module should be truthy', () => {
    expect(MiddlewareModule).toBeTruthy();
  });
});
