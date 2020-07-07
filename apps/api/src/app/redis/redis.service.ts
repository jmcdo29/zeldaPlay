import { Inject, Injectable } from '@nestjs/common';
import { RedisClient } from 'redis';
import { bindNodeCallback, Observable } from 'rxjs';
import { REDIS_INSTANCE } from './redis.constants';

@Injectable()
export class RedisService {
  private memoizedMethods: Record<
    string,
    (...args: any[]) => Observable<any>
  > = {};
  constructor(@Inject(REDIS_INSTANCE) private readonly redis: RedisClient) {}

  private fromObservable(method: string, ...args: any[]): Observable<any> {
    if (this.memoizedMethods[method]) {
      return this.memoizedMethods[method](...args);
    }
    this.memoizedMethods[method] = bindNodeCallback(
      this.redis[method].bind(this.redis),
    );
    return this.memoizedMethods[method](...args);
  }

  get(key: string): Observable<string> {
    return this.fromObservable('get', key);
  }

  set(key: string, value: string): Observable<boolean> {
    return this.fromObservable('set', key, value);
  }
}
