import { jsonSerializer } from '@deepkit/type';
import { Injectable, Type } from '@nestjs/common';
import { OgmaService } from '@ogma/nestjs-module';
import { Pool } from 'pg';
import { from, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {
  DatabaseFeatureOptions,
  DatabaseInterface,
  InsertParams,
  QueryParams,
  UpdateManyParams,
  UpdateParams,
} from './interfaces/database.interface';

@Injectable()
export class DatabaseService<T> implements DatabaseInterface<T> {
  tableName: string;

  constructor(
    private readonly pool: Pool,
    readonly feature: DatabaseFeatureOptions,
    private readonly logger: OgmaService,
  ) {
    this.tableName = feature.tableName;
  }

  private runQuery(
    query: string,
    params: any[],
    type: Type<T>,
  ): Observable<T[]> {
    const start = Date.now();
    return from(this.pool.query(query, params)).pipe(
      tap((qRes) => {
        this.logger.debug({
          query,
          time: Date.now() - start,
          rows: qRes.rowCount,
        });
      }),
      map((qRes) =>
        qRes.rows
          .map(this.underScoreToCamelCase)
          .map((row) => jsonSerializer.for(type).deserialize(row)),
      ),
      catchError((err) => {
        this.logger.debug({
          query,
          time: Date.now() - start,
        });
        this.logger.printError(err);
        return of([]);
      }),
    );
  }

  private underScoreToCamelCase(
    record: Record<string, any>,
  ): Record<string, any> {
    const newObj = {};
    Object.keys(record).forEach((key) => {
      const origKey = key;
      while (key.indexOf('_') > -1) {
        const _index = key.indexOf('_');
        const nextChar = key.charAt(_index + 1);
        key = key.replace(`_${nextChar}`, nextChar.toUpperCase());
      }
      newObj[key] = record[origKey];
    });
    return newObj;
  }

  query(params: QueryParams, type: Type<T>): Observable<T[]> {
    const query =
      'SELECT ' +
      params.query +
      ' FROM ' +
      this.tableName +
      ' WHERE ' +
      params.where;
    return this.runQuery(query, params.variables, type);
  }

  insert(params: InsertParams, type: Type<T>): Observable<T[]> {
    const query =
      'INSERT INTO ' +
      this.tableName +
      ' (' +
      params.query +
      ') VALUES (' +
      params.where +
      ') RETURNING *;';
    return this.runQuery(query, params.variables, type);
  }

  // tslint:disable-next-line: no-identical-functions
  update(params: UpdateParams, type: Type<T>): Observable<T[]> {
    const query =
      'UPDATE ' +
      this.tableName +
      ' SET ' +
      params.query +
      ' WHERE ' +
      params.where +
      ' RETURNING *;';
    return this.runQuery(query, params.variables, type);
  }

  updateMany(params: UpdateManyParams, type: Type<T>): Observable<T[]> {
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
      ' RETURNING *;';
    return this.runQuery(query, params.variables, type);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  delete(params: QueryParams): Observable<T[]> {
    return of([]);
  }
}
