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
    it('should run the query for query', (done) => {
      service.query<any>({ query: '*', variables: ['characterId'] }).subscribe({
        next(result) {
          expect(result).toBe(returnResult);
        },
        error(error) {
          throw new Error(error.message);
        },
        complete() {
          done();
        }
      });
    });
    it('should return for an error in the query', (done) => {
      querySpy.mockImplementationOnce(
        () => Promise.reject(new Error('Error')) as any
      );
      service.query<any>({ query: '*', variables: ['characterId'] }).subscribe({
        next(result) {
          expect(result).toEqual([]);
        },
        error(error) {
          throw new Error(error.message);
        },
        complete() {
          done();
        }
      });
    });
  });
});
