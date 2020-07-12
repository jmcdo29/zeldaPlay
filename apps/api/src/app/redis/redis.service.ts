import { Inject, Injectable } from '@nestjs/common';
import { OgmaLogger, OgmaService } from '@ogma/nestjs-module';
import { RedisClient } from 'redis';
import { bindNodeCallback, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { REDIS_INSTANCE } from './redis.constants';

@Injectable()
export class RedisService {
  private memoizedMethods: Record<
    string,
    (...args: any[]) => Observable<any>
  > = {};
  constructor(
    @Inject(REDIS_INSTANCE) private readonly redis: RedisClient,
    @OgmaLogger('Redis') private readonly logger: OgmaService,
  ) {}

  private fromObservable(method: string, ...args: any[]): Observable<any> {
    const start = Date.now();
    if (!this.memoizedMethods[method]) {
      this.memoizedMethods[method] = bindNodeCallback(
        this.redis[method].bind(this.redis),
      );
    }
    return this.memoizedMethods[method](...args).pipe(
      tap(
        () => {
          this.debug(start, method, args[0]);
        },
        () => {
          this.debug(start, method, args[0]);
        },
      ),
    );
  }

  private debug(start: number, method: string, key: string): void {
    this.logger.debug({
      query: {
        method,
        key,
      },
      time: Date.now() - start,
    });
  }

  get(key: string): Observable<string> {
    return this.fromObservable('get', key);
  }

  set(key: string, value: string, timeout?: number): Observable<boolean> {
    let bool;
    return this.fromObservable('set', key, value).pipe(
      switchMap((data) => {
        bool = data;
        if (timeout) {
          return this.expire(key, timeout / 1000);
        }
        return of(data);
      }),
      map(() => bool),
    );
  }

  expire(key: string, timeout: number): Observable<void> {
    return this.fromObservable('expire', key, timeout);
  }
}
