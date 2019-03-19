import { of, throwError } from 'rxjs';
import { MetricsInterceptor } from './metrics.interceptor';

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
      const call$ = { handle: () => of([]) };
      const error$ = { handle: () => throwError(new Error('Error')) };
      it('should work for non-errors', () => {
        interceptor.intercept(context, call$).subscribe();
      });
      it('should work for errors', () => {
        interceptor.intercept(context, error$).subscribe({ error(err) {} });
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
      const call$ = { handle: () => of([]) };
      const errored$ = { handle: () => throwError(new Error('Error')) };
      it('should work for non-errors', () => {
        interceptor.intercept(context, call$).subscribe();
      });
      it('should work for errors', () => {
        interceptor.intercept(context, errored$).subscribe({ error(err) {} });
      });
    });
  });
});
