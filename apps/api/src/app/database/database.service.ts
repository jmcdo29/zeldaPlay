import { Inject, Injectable, OnModuleInit, Scope } from '@nestjs/common';
import { Pool } from 'pg';
import { from, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoggerService } from '../logger/logger.service';
import {
  DATABASE_FEATURE,
  DATABASE_MODULE_OPTIONS,
} from './database.constants';
import { DatabaseModuleOptions } from './interfaces/database-options.interface';
import {
  DatabaseFeatureOptions,
  DatabaseInterface,
  InsertParams,
  QueryParams,
  UpdateManyParams,
  UpdateParams,
} from './interfaces/database.interface';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class DatabaseService implements OnModuleInit, DatabaseInterface {
  private pool: Pool;

  tableName: string;

  constructor(
    @Inject(DATABASE_MODULE_OPTIONS)
    private readonly options: DatabaseModuleOptions,
    @Inject(DATABASE_FEATURE)
    readonly feature: DatabaseFeatureOptions,
    private readonly logger: LoggerService,
  ) {
    this.tableName = feature.tableName;
  }

  onModuleInit() {
    this.pool = new Pool({
      connectionString: this.options.connectionUrl,
      ssl: this.options.ssl,
    });
  }

  private runQuery<T>(query: string, params: any[]): Observable<T[]> {
    const start = Date.now();
    return from(this.pool.query(query, params)).pipe(
      tap((qRes) => {
        this.logger.debug({
          query,
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

  query<T>(params: QueryParams): Observable<T[]> {
    const query =
      'SELECT ' +
      params.query +
      ' ' +
      this.tableName +
      ' WHERE ' +
      params.where;
    return this.runQuery<T>(query, params.variables);
  }

  insert<T>(params: InsertParams): Observable<T[]> {
    const query =
      'INSERT INTO ' +
      this.tableName +
      ' (' +
      params.query +
      ') VALUES (' +
      params.where +
      ') RETURNING id;';
    return this.runQuery<T>(query, params.variables);
  }

  update<T>(params: UpdateParams): Observable<T[]> {
    const query =
      'UPDATE ' +
      this.tableName +
      ' SET ' +
      params.query +
      ' WHERE ' +
      params.where +
      ' RETURNING id;';
    return this.runQuery<T>(query, params.variables);
  }

  updateMany<T>(params: UpdateManyParams): Observable<T[]> {
    const query =
      'UPDATE ' +
      this.tableName +
      ' AS ' +
      params.tableAlias +
      ' SET ' +
      params.query +
      ' FROM ' +
      params.tempTable +
      ' WHERE ' +
      params.where +
      ';';
    return this.runQuery<T>(query, params.variables);
  }

  delete<T>(params: QueryParams): Observable<T[]> {
    return of([]);
  }
}
