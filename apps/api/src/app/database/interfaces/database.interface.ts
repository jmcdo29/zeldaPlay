import { Observable } from 'rxjs';

export interface QueryParams {
  /**
   * The query string using ? or $1 to mark parameters for a parameterized query
   */
  query: string;
  /**
   * Filtering condition on what to query for
   */
  where?: string;
  /**
   * The values to inject into the query at runtime. Helps guard against SQL Injection
   */
  variables: any[];
}

export interface InsertParams {
  query: string;
  where?: string;
  variables: any[];
}

export interface UpdateParams {
  query: string;
  where?: string;
  variables: any[];
}

export interface UpdateManyParams {
  query: string;
  tableAlias: string;
  where?: string;
  tempTable: string;
  variables: any[];
}

export interface DatabaseInterface {
  tableName: string;

  /**
   * method specifically for running queries
   * @param params object of string and any array for what query should be run and with what parameters for SQL injection protection
   */
  query<T>(params: QueryParams): Observable<T[]>;

  /**
   * Method specifically for running inserts
   * @param params object of string and any array for what query should be run and with what parameters for SQL injection protection
   */
  insert<T>(params: QueryParams): Observable<T[]>;

  /**
   * Method specifically for running updates
   * @param params object of string and any array for what query should be run and with what parameters for SQL injection protection
   */
  update<T>(params: QueryParams): Observable<T[]>;

  /**
   * Method specifically for running deletes
   * @param params object of string and any array for what query should be run and with what parameters for SQL injection protection
   */
  delete<T>(params: QueryParams): Observable<T[]>;
}
