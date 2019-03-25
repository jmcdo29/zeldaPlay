import { Injectable, OnModuleInit } from '@nestjs/common';
import { scribe } from 'mc-scribe';
import { Pool } from 'pg';
import { from, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class DbService implements OnModuleInit {
  private pool: Pool;
  private counter: number;

  constructor() {}

  onModuleInit() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL
    });
    this.counter = 0;
  }

  query<T>(text: string, params: any[]): Observable<T[]> {
    this.counter++;
    const qStart = Date.now();
    text = text.replace(/\n\s*,/g, ', ').replace(/\n\s*/g, ' ');
    return from(this.pool.query(text, params)).pipe(
      map((queryRes) => {
        this.counter = 0;
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

  private error(err: Error): void {
    if (this.counter < 3) {
      this.pool.query(
        'INSERT INTO zeldaplay.errors (message, stack) VALUES ($1, $2)',
        [err.message, err.stack]
      );
    }
  }
}
