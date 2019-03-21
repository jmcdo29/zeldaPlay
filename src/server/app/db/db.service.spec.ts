import { Test, TestingModule } from '@nestjs/testing';
import { Pool } from 'pg';

import { DbService } from './db.service';
Pool.prototype.connect = jest.fn();
jest.mock('pg');

describe('DbService', () => {
  let service: DbService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbService]
    }).compile();
    service = module.get<DbService>(DbService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('#query', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it('should return a record of some sort', () => {
      const querySpy = (Pool.prototype.query as any).mockImplementation(() =>
        Promise.resolve({
          rowCount: 1,
          rows: [{ id: '00C2nI7nYh21' }]
        })
      );
      service
        .query<{ id: string }>('SELECT Id FROM Character LIMIT 1;', [])
        .subscribe((queryRes) => {
          expect(querySpy).toBeCalledTimes(1);
          expect(querySpy).toBeCalledWith(
            'SELECT Id FROM Character LIMIT 1;',
            []
          );
          expect(queryRes).toEqual([{ id: '00C2nI7nYh21' }]);
        });
    });
    it('should return an empty array because of a bad query', () => {
      const querySpy = (Pool.prototype.query as any).mockImplementationOnce(
        () => Promise.reject(new Error('Error'))
      );
      service.query<any>('This is a bad query', []).subscribe((qResult) => {
        expect(querySpy).toBeCalledTimes(2);
        expect(querySpy).toBeCalledWith('This is a bad query', []);
        expect(qResult).toEqual([]);
      });
    });
  });
});
