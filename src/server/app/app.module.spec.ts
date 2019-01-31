import { AppModule } from './app.module';

describe('#AppModule', () => {
  beforeAll(() => {
    process.env.NODE_ENV = 'test';
  });

  test('module should be truthy', async () => {
    expect(AppModule).toBeTruthy();
  });
});
