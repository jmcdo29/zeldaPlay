import { Observable } from 'rxjs';

export interface GetOne<T, U> {
  getOne(id: T): Observable<U>;
}
