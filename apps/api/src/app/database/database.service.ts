import { Injectable } from '@nestjs/common';
import { scribe } from 'mc-scribe';
import { Pool } from 'pg';
import { from, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class DatabaseService {
  private readonly pool: Pool;

  constructor(connectionString: string, ssl: boolean) {
    this.pool = new Pool({ connectionString, ssl });
  }

  query<T>(params: { query: string; variables: any[] }): Observable<T[]> {
    return from(this.pool.query(params.query, params.variables)).pipe(
      map((qRes) => qRes.rows),
      catchError((err) => {
        scribe.error(err.message);
        scribe.fine(err.stack);
        return of([]);
      })
    );
  }
}
