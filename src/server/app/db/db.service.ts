import { Injectable } from '@nestjs/common';
import { scribe } from 'mc-scribe';
import { Pool } from 'pg';
import { from, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class DbService {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL
    });
  }

  query<T>(text: string, params: any[]): Observable<T[]> {
    const qStart = Date.now();
    text = text.replace(/\n\s*,/g, ', ').replace(/\n\s*/g, ' ');
    return from(this.pool.query(text, params)).pipe(
      map((queryRes) => {
        scribe('DEBUG', {
          text,
          duration: Date.now() - qStart + ' ms',
          rows: queryRes.rowCount
        });
        return queryRes.rows;
      }),
      catchError((err: Error) => {
        scribe('ERROR', err.message);
        scribe('DEBUG', {
          text,
          duration: Date.now() - qStart + ' ms'
        });
        scribe('FINE', err.stack);
        this.error(err);
        return of([]);
      })
    );
  }

  error(err: Error): void {
    this.pool.query(
      'INSERT INTO zeldaplay.errors (message, stack) VALUES ($1, $2)',
      [err.message, err.stack]
    );
  }
}
