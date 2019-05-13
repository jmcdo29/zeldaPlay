import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { Observable, of, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { scribe } from 'mc-scribe';

@Injectable()
export class DatabaseService {
  private readonly pool: Pool;

  constructor(connectionString: string, ssl: boolean) {
    this.pool = new Pool({connectionString, ssl});
  }

  getOne<T>(): Observable<T> {
    return of();
  }

  getMany<T>(): Observable<T[]> {
    return of([]);
  }

  private query<T>(params: {query: string, variables: any[]}): Observable<T[]> {
    return from(this.pool.query(params.query, params.variables)).pipe(
      map((qRes) => qRes.rows),
      catchError((err) => {
        scribe.error(err.message);
        scribe.fine(err.stack);
        return of([])
      })
    )
  }
}
