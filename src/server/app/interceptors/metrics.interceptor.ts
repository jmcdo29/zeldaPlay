import { DbService } from '@Db/db.service';
import { ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { ValidationError } from 'class-validator';
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
    const http = context.switchToHttp();
    const request = http.getRequest();
    scribe('DEBUG', 'route', request.url, 'method', request.method);
    return call$.pipe(
      tap(() => {
        scribe('DEBUG', 'request time', Date.now() - start);
      }),
      catchError((err) => {
        scribe('DEBUG', 'request time', Date.now() - start);
        throw err;
      })
    );
  }

  makeQuery(): void {}
}
