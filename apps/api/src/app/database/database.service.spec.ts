import { Test, TestingModule } from '@nestjs/testing';
import { Pool } from 'pg';
import { tap } from 'rxjs/operators';
import { DatabaseService } from './database.service';

Pool.prototype.connect = jest.fn();
Pool.prototype.query = jest.fn().mockReturnValue({
  command: 'SELECT * FROM test.base',
  rowCount: 0,
  oid: 'something, I guess',
  format: '???',
  rows: []
});

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
  it('should run the query for getOne', () => {
    service
      .getOne<any>('*', 'characterId')
      .pipe(tap(result => expect(result).toBe({})));
  });
  it('should run the query for getMany', () => {
    service
      .getMany<any>('*', 'userId')
      .pipe(tap(result => expect(result).toBe([])));
  });
  it('should run the query for insertOne', () => {
    service
      .insertOne<any>('Insert string', [])
      .pipe(tap(result => expect(result).toBe({})));
  });
  it('should run the query for updateOne', () => {
    service
      .updateOne<any>('Update string', [], 'charId')
      .pipe(tap(result => expect(result).toBe({})));
  });
  it('should run the query for deleteOne', () => {
    service
      .deleteOne<any>('character', 'characterId')
      .pipe(tap(result => expect(result).toBe({})));
  });
  it('should work even if there is a query error', () => {
    Pool.prototype.query = jest.fn().mockImplementationOnce(() => {
      throw new Error('Error thrown');
    });
    service
      .getOne('', 'characterId')
      .pipe(tap(result => expect(result).toBeTruthy()));
  });
});
