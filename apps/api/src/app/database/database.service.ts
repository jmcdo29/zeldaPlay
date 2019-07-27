import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { scribe } from 'mc-scribe';
import { Pool } from 'pg';
import { from, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DATABASE_MODULE_OPTIONS } from './database.constants';
import { DatabaseModuleOptions } from './interfaces/database-options.interface';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private pool!: Pool;

  constructor(
    @Inject(DATABASE_MODULE_OPTIONS)
    private readonly options: DatabaseModuleOptions,
  ) {}

  onModuleInit() {
    this.pool = new Pool({
      connectionString: this.options.connectionUrl,
      ssl: this.options.ssl || false,
    });
  }

  query<T>(params: { query: string; variables: any[] }): Observable<T[]> {
    return from(this.pool.query(params.query, params.variables)).pipe(
      map((qRes) => qRes.rows),
      catchError((err) => {
        scribe.error(err.message);
        scribe.fine(err.stack);
        return of([]);
      }),
    );
  }
}
