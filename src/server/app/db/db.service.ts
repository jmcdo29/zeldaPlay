import { Injectable, OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';
import { from, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MyLogger } from '../logger/logger.service';

@Injectable()
export class DbService implements OnModuleInit {
  private pool: Pool;
  private counter: number;

  constructor(private readonly logger: MyLogger) {}

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
        this.logger.debug(
          {
            text,
            duration: Date.now() - qStart + ' ms',
            rows: queryRes.rowCount
          },
          'DbService'
        );
        return queryRes.rows;
      }),
      catchError((err: Error) => {
        this.logger.error(err.message, err.stack, 'DbService');
        this.logger.debug(
          {
            text,
            duration: Date.now() - qStart + ' ms'
          },
          'DbService'
        );
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
