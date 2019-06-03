import { Test, TestingModule } from '@nestjs/testing';
import { Pool } from 'pg';
import { DatabaseService } from './database.service';
jest.mock('pg');

const returnResult = [
  {
    id: 1,
    field1: 'value1',
    field2: 'value2'
  },
  {
    id: 2,
    field1: 'value1',
    field2: 'value2'
  }
];

const querySpy = jest.spyOn(Pool.prototype, 'query').mockImplementation(
  () =>
    Promise.resolve({
      command: 'SELECT * FROM test.base',
      rowCount: 0,
      oid: 'something, I guess',
      fields: ['id', 'name'],
      rows: returnResult
    }) as any
);

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: DatabaseService,
          useFactory: () => new DatabaseService('connectionString', false)
        }
      ]
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('queries', () => {
    it('should run the query for getOne', done => {
      service.getOne<any>('*', 'characterId').subscribe(result => {
        expect(result).toBe(returnResult[0]);
        done();
      });
    });
    it('should run the query for getMany', done => {
      service.getMany<any>('*', 'userId').subscribe(result => {
        expect(result).toBe(returnResult);
        done();
      });
    });
    it('should run the query for getAll', done => {
      service.getAll<any>('character').subscribe(result => {
        expect(result).toBe(returnResult);
        done();
      });
    });
    it('should run the query for insertOne', done => {
      service
        .insertOne<any>('MockObject', {
          field1: 'value1',
          field2: 'value2',
          field3: 'value3'
        })
        .subscribe(result => {
          expect(result).toBe(returnResult[0]);
          done();
        });
    });
    it('should run the query for updateOne', done => {
      service
        .updateOne<any>('character', { field1: 'value1', id: 'the id' })
        .subscribe(result => {
          expect(result).toBe(returnResult[0]);
          done();
        });
    });
    it('should run the query for deleteOne', done => {
      service.deleteOne<any>('character', 'characterId').subscribe(result => {
        expect(result).toBe(returnResult[0]);
        done();
      });
    });
    it('should work even if there is a query error', done => {
      querySpy.mockImplementationOnce(
        () => Promise.reject(new Error('Query Error')) as any
      );
      service.getMany<any>('', 'characterId').subscribe(result => {
        expect(result).toBeTruthy();
        expect(result).toStrictEqual([]);
        done();
      });
    });
  });
});
