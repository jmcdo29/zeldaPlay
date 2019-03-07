import { DbService } from '@Db/db.service';
import { DbMetrics } from '@DbModel/index';
import { ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { scribe } from 'mc-scribe';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

/**
 * Metrics Interceptor for generating metrics of the app and response times
 */
@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  constructor(private readonly dbService: DbService) {}

  intercept(
    context: ExecutionContext,
    call$: Observable<any>
  ): Observable<any> {
    const start = Date.now();
    const request = context.switchToHttp().getRequest();
    const method = request.method || request.raw.method;
    const route = request.url || request.raw.url;
    return call$.pipe(
      tap(() => {
        this.makeQuery({
          method,
          route,
          responseStatus: 200,
          responseTime: Date.now() - start
        });
      }),
      catchError((err) => {
        this.makeQuery({
          method,
          route,
          responseStatus: 400,
          responseTime: Date.now() - start
        });
        throw err;
      })
    );
  }

  makeQuery(metric: Partial<DbMetrics>): void {
    this.dbService.query(
      'INSERT INTO zeldaplay.metrics (method, route, response_status, response_time) VALUES ($1, $2, $3, $4)',
      [metric.method, metric.route, metric.responseStatus, metric.responseTime]
    );
  }
}
