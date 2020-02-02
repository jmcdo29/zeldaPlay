import { Observable } from 'rxjs';

export interface ControllerType {
  getOne: string;
  getMany: string;
  returnType: any;
  createOne: object;
  createMany: object[];
  updateOne: object;
  deleteOne: string;
  deleteMany: string;
}

export interface DeleteReturn {
  status: 'Okay' | 'Failed';
}

export interface GetOne<T extends string, U> {
  getOne(singleId: T): Observable<U>;
}

export interface GetMany<T extends string, U> {
  getMany(multiId: T): Observable<U[]>;
}

export interface CreateOne<T, U> {
  createOne(body: T): Observable<U>;
}

export interface CreateMany<T, U> {
  createMany(body: T): Observable<U[]>;
}

export interface UpdateOne<T, U extends string, V> {
  updateOne(body: Partial<T>, id: U): Observable<V>;
}

export interface DeleteOne<T> {
  deleteOne(id: T): Observable<DeleteReturn>;
}

export interface DeleteMany<T> {
  deleteMany(ownerId: T): Observable<DeleteReturn>;
}

export interface FullController<T extends ControllerType>
  extends GetOne<T['getOne'], T['returnType']>,
    GetMany<T['getMany'], T['returnType']>,
    CreateOne<T['createOne'], T['returnType']>,
    CreateMany<T['createMany'], T['returnType']>,
    UpdateOne<T['updateOne'], T['getOne'], T['returnType']>,
    DeleteOne<T['deleteOne']>,
    DeleteMany<T['deleteMany']> {}
