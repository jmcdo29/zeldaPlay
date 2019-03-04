import { MetricsInterceptor } from './metrics.interceptor';

describe('MetricsInterceptor', () => {
  it('should be defined', () => {
    expect(new MetricsInterceptor({ query: jest.fn() } as any)).toBeTruthy();
  });
});
