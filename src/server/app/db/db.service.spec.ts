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
    it('should return a record of some sort', async () => {
      const querySpy = jest.spyOn(Pool.prototype, 'query').mockReturnValue({
        rowCount: 1,
        rows: [{ id: '00C2nI7nYh21' }]
      });
      const qResult = await service.query(
        'SELECT Id FROM Character LIMIT 1;',
        []
      );
      expect(querySpy).toBeCalledTimes(1);
      expect(querySpy).toBeCalledWith('SELECT Id FROM Character LIMIT 1;', []);
      expect(qResult).toEqual([{ id: '00C2nI7nYh21' }]);
    });
    it('should return an empty array because of a bad query', async () => {
      const querySpy = jest
        .spyOn(Pool.prototype, 'query')
        .mockImplementation(() => {
          throw new Error('Malformed Query');
        });
      const qResult = await service.query('This is a bad query', []);
      expect(querySpy).toBeCalledTimes(1);
      expect(querySpy).toBeCalledWith('This is a bad query', []);
      expect(qResult).toEqual([]);
    });
  });
});
