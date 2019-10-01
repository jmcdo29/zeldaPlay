import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';
import { from, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MyLogger } from '../logger/logger.service';
import { DATABASE_MODULE_OPTIONS } from './database.constants';
import { DatabaseModuleOptions } from './interfaces/database-options.interface';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private pool!: Pool;

  constructor(
    @Inject(DATABASE_MODULE_OPTIONS)
    private readonly options: DatabaseModuleOptions,
    private readonly logger: MyLogger,
  ) {}

  onModuleInit() {
    this.pool = new Pool({
      connectionString: this.options.connectionUrl,
      ssl: this.options.ssl,
    });
  }

  query<T>(params: { query: string; variables: any[] }): Observable<T[]> {
    const start = Date.now();
    return from(this.pool.query(params.query, params.variables)).pipe(
      tap((qRes) => {
        this.logger.debug({
          query: params.query,
          time: Date.now() - start,
          rows: qRes.rowCount,
        });
      }),
      map((qRes) => qRes.rows),
      catchError((err) => {
        this.logger.error(err.message, err.stack);
        return of([]);
      }),
    );
  }
}
