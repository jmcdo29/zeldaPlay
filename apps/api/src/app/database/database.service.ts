import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { Observable, of, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { scribe } from 'mc-scribe';

@Injectable()
export class DatabaseService {
  private readonly pool: Pool;

  constructor(connectionString: string, ssl: boolean) {
    this.pool = new Pool({ connectionString, ssl });
  }

  getOne<T>(query: string, association: string): Observable<T> {
    return this.query<T>({ query, variables: [association] }).pipe(
      map(result => result[0])
    );
  }

  getMany<T>(query: string, association: string): Observable<T[]> {
    return this.query<T>({ query, variables: [association] });
  }

  insertOne<T>(query: string, fields: any[]): Observable<T> {
    return this.query<T>({ query, variables: [fields] }).pipe(
      map(result => result[0])
    );
  }

  updateOne<T>(query: string, fields: any, association: string): Observable<T> {
    return of();
  }

  deleteOne<T>(object: string, association: string): Observable<T> {
    return of();
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
}
