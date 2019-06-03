import { Injectable } from '@nestjs/common';
import { scribe } from 'mc-scribe';
import { Pool } from 'pg';
import { from, Observable, of, OperatorFunction } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class DatabaseService {
  private readonly pool: Pool;

  constructor(connectionString: string, ssl: boolean) {
    this.pool = new Pool({ connectionString, ssl });
  }

  getOne<T>(query: string, association: string): Observable<T> {
    return this.query<T>({ query, variables: [association] }).pipe(
      this.returnFirst()
    );
  }

  getMany<T>(query: string, association: string): Observable<T[]> {
    return this.query<T>({ query, variables: [association] });
  }

  getAll<T>(objectName: string): Observable<T[]> {
    return this.query<T>({
      query: `SELECT * FROM ${objectName}`,
      variables: []
    });
  }

  insertOne<T>(objectName: string, object: T): Observable<T> {
    let query = `INSERT INTO ${objectName}`;
    let counter = 0;
    let fields = '';
    let vars = '';
    for (const key of Object.keys(object)) {
      counter++;
      fields += key + ',';
      vars += '$' + counter + ',';
    }
    fields = '(' + fields.substring(0, fields.length - 1) + ')';
    vars = '(' + vars.substring(0, vars.length - 1) + ')';
    query = query + fields + ' VALUES ' + vars + ' RETURNING id';
    return this.query<T>({ query, variables: [Object.values(object)] }).pipe(
      this.returnFirst()
    );
  }

  updateOne<T extends { id: string }>(
    objectName: string,
    object: T
  ): Observable<T> {
    let query = `UPDATE ${objectName} SET `;
    let counter = 0;
    let updates = '';
    const vars = [];
    for (const key of Object.keys(object)) {
      if (key !== 'id') {
        counter++;
        updates += key + ` = $${counter},`;
        vars.push(object[key]);
      }
    }
    vars.push(object.id);
    query =
      query +
      updates.substring(0, updates.length - 1) +
      ` WHERE id = $${counter++}`;
    return this.query<T>({ query, variables: vars }).pipe(this.returnFirst());
  }

  deleteOne<T>(table: string, association: string): Observable<T> {
    return this.query<T>({
      query: `DELETE ${table} WHERE id = $1`,
      variables: [association]
    }).pipe(this.returnFirst());
  }

  private query<T>(params: {
    query: string;
    variables: any[];
  }): Observable<T[]> {
    return from(this.pool.query(params.query, params.variables)).pipe(
      map(qRes => qRes.rows),
      catchError(err => {
        scribe.error(err.message);
        scribe.fine(err.stack);
        return of([]);
      })
    );
  }

  private returnFirst<T>(): OperatorFunction<T[], T> {
    return map(result => result[0]);
  }
}
