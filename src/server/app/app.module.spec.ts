import { AppModule } from './app.module';

describe('#AppModule', () => {
  beforeAll(() => {
    process.env.NODE_ENV = 'test';
  });

  test('module should be truthy', async () => {
    process.env.NODE_ENV = 'test';
    expect(AppModule).toBeTruthy();
  });
});
