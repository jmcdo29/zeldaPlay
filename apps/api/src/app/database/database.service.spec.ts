import { createMock, DeepMocked } from '@golevelup/nestjs-testing';
import { Test, TestingModule } from '@nestjs/testing';
import { Pool } from 'pg';
import { LoggerService } from '../logger/logger.service';
import { DatabaseService } from './database.service';
import { DATABASE_POOL, DATABASE_FEATURE } from './database.constants';

interface MockResult {
  id: number;
  field1: string;
  field2: string;
}

const returnResult: MockResult[] = [
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

describe('DatabaseService', () => {
  let module: TestingModule;
  let service: DatabaseService<MockResult>;
  let pool: DeepMocked<Pool>;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        DatabaseService,
        {
          provide: DATABASE_POOL,
          useValue: createMock<Pool>({
            query: jest.fn().mockImplementation(() => {
              return Promise.resolve({
                command: 'SELECT * FROM test.base',
                rowCount: 0,
                oid: 'something, I guess',
                fields: ['id', 'name'],
                rows: returnResult,
              });
            }),
          }),
        },
        {
          provide: DATABASE_FEATURE,
          useValue: { tableName: 'Testing' },
        },
        {
          provide: LoggerService,
          useValue: new LoggerService({ context: 'DATABASE_TEST' }),
        },
      ],
    }).compile();

    service = module.get<DatabaseService<MockResult>>(DatabaseService);
    pool = module.get<DeepMocked<Pool>>(DATABASE_POOL);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('queries', () => {
    it('should run the query for query', (done) => {
      service.query({ query: '*', variables: ['characterId'] }).subscribe({
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
      pool.query.mockImplementationOnce(
        () => Promise.reject(new Error('Error')) as any,
      );
      service.query({ query: '*', variables: ['characterId'] }).subscribe({
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
  describe('insert', () => {
    it('should take an insert query successfully', (done) => {
      const insertSpy = jest.spyOn(service as any, 'runQuery');
      service
        .insert({
          query: 'column1, column2',
          where: '$1, $2',
          variables: ['value1', 'value2'],
        })
        .subscribe({
          next(result) {
            expect(result).toBe(returnResult);
          },
          error(err) {
            throw err;
          },
          complete() {
            expect(
              insertSpy,
            ).toBeCalledWith(
              'INSERT INTO Testing (column1, column2) VALUES ($1, $2) RETURNING id;',
              ['value1', 'value2'],
            );
            done();
          },
        });
    });
  });
  describe('update', () => {
    it('should take an update query successfully', (done) => {
      const updateSpy = jest.spyOn(service as any, 'runQuery');
      service
        .update({
          query: 'column1 = $1',
          where: 'column2 = $2',
          variables: ['value1', 'value2'],
        })
        .subscribe({
          next(result) {
            expect(result).toEqual(returnResult);
          },
          error(err) {
            throw err;
          },
          complete() {
            expect(
              updateSpy,
            ).toBeCalledWith(
              'UPDATE Testing SET column1 = $1 WHERE column2 = $2 RETURNING id;',
              ['value1', 'value2'],
            );
            done();
          },
        });
    });
  });
  describe('updateMany', () => {
    it('should run an updateMany query successfully', (done) => {
      const updateManySpy = jest.spyOn(service as any, 'runQuery');
      service
        .updateMany({
          query:
            'alias.column1 = incoming.column1, alias.column2 = incoming.column2',
          tableAlias: 'alias',
          tempTable:
            '(VALUES ($1, $2, $3) AS incoming (column1, column2, column3))',
          where: 'alias.column3 = incoming.column3',
          variables: ['value1', 'value2', 'value3'],
        })
        .subscribe({
          next(result) {
            expect(result).toEqual(returnResult);
          },
          error(err) {
            throw err;
          },
          complete() {
            expect(
              updateManySpy,
            ).toBeCalledWith(
              'UPDATE Testing AS alias SET alias.column1 = incoming.column1, alias.column2 = incoming.column2 FROM (VALUES ($1, $2, $3) AS incoming (column1, column2, column3)) WHERE alias.column3 = incoming.column3;',
              ['value1', 'value2', 'value3'],
            );
            done();
          },
        });
    });
  });
  describe('delete', () => {
    it('should run a delete successfully', (done) => {
      service
        .delete({
          query: '',
          where: '',
          variables: [],
        })
        .subscribe({
          next(result) {
            expect(result).toEqual([]);
          },
          error(err) {
            throw err;
          },
          complete() {
            done();
          },
        });
    });
  });
});
