import { MetricsInterceptor } from './metrics.interceptor';
import { of, throwError } from 'rxjs';

describe('MetricsInterceptor', () => {
  let interceptor: MetricsInterceptor;

  beforeAll(() => {
    interceptor = new MetricsInterceptor({ query: jest.fn() } as any);
  });

  it('should be defined', () => {
    expect(interceptor).toBeTruthy();
  });
  describe('intercept', () => {
    describe('express', () => {
      const context: any = {
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn().mockReturnValue({
            method: 'GET',
            url: 'string'
          })
        })
      };
      const call$ = of([]);
      it('should work for non-errors', () => {
        interceptor.intercept(context, call$).subscribe();
      });
      it('should work for errors', () => {
        interceptor
          .intercept(context, throwError(new Error('Error')))
          .subscribe({ error(err) {} });
      });
    });
    describe('fastify', () => {
      const context: any = {
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn().mockReturnValue({
            raw: {
              method: 'GET',
              url: 'string'
            }
          })
        })
      };
      const call$ = of([]);
      it('should work for non-errors', () => {
        interceptor.intercept(context, call$).subscribe();
      });
      it('should work for errors', () => {
        interceptor
          .intercept(context, throwError(new Error('Error')))
          .subscribe({ error(err) {} });
      });
    });
  });
});
