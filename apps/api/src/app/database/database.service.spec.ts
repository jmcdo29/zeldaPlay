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
    it('should run the query for getOne', (done) => {
      service
        .query<any>({ query: '*', variables: ['characterId'] })
        .subscribe((result) => {
          expect(result).toBe(returnResult[0]);
          done();
        });
    });
  });
});
