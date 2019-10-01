import { Test, TestingModule } from '@nestjs/testing';
import { Pool } from 'pg';
import { MyLogger } from '../logger/logger.service';
import { DatabaseService } from './database.service';
jest.mock('pg');

const returnResult = [
  {
    id: 1,
    field1: 'value1',
    field2: 'value2',
  },
  {
    id: 2,
    field1: 'value1',
    field2: 'value2',
  },
];

const querySpy = jest.spyOn(Pool.prototype, 'query').mockImplementation(() => {
  return Promise.resolve({
    command: 'SELECT * FROM test.base',
    rowCount: 0,
    oid: 'something, I guess',
    fields: ['id', 'name'],
    rows: returnResult,
  });
});

describe('DatabaseService', () => {
  let module: TestingModule;
  let service: DatabaseService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        {
          provide: DatabaseService,
          useFactory: () =>
            new DatabaseService(
              {
                connectionUrl: 'connectionString',
                ssl: false,
              },
              new MyLogger({ context: 'DATABASE_TEST' }),
            ),
        },
      ],
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
    await module.init();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should initialize', async () => {
    await module.init();
    expect(service).toBeDefined();
    await module.close();
  });
  describe('queries', () => {
    it('should run the query for query', (done) => {
      service.query<any>({ query: '*', variables: ['characterId'] }).subscribe({
        next(result) {
          expect(result).toBe(returnResult);
        },
        error(error) {
          throw error;
        },
        complete() {
          done();
        },
      });
    });
    it('should return for an error in the query', (done) => {
      querySpy.mockImplementationOnce(
        () => Promise.reject(new Error('Error')) as any,
      );
      service.query<any>({ query: '*', variables: ['characterId'] }).subscribe({
        next(result) {
          expect(result).toEqual([]);
        },
        error(error) {
          throw error;
        },
        complete() {
          done();
        },
      });
    });
  });
});
