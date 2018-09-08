import * as express from 'express';
import * as supertest from 'supertest';

import { CharacterRouter } from '../../src/controllers/character.controller';
import {
  getAll,
  getOne,
  getUserCharacters,
  updateOne
} from '../../src/services/character.service';
import { DatabaseError } from '../../src/utils/errors/DatabaseError';

jest.mock('../../src/services/character.service.ts', () => ({
  getAll: jest.fn(),
  getOne: jest.fn(),
  getUserCharacters: jest.fn(),
  updateOne: jest.fn()
}));

describe('character routes', () => {
  const app = express();
  app.use(express.json());
  CharacterRouter(app, '/');
  const request = supertest.agent(app);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('the /characters route', () => {
    test('200 character returned', async () => {
      (getAll as jest.Mock).mockResolvedValueOnce(
        Promise.resolve([{ name: 'Bryte', race: 'Fairy' }])
      );
      const response = await request.get('/characters');
      expect(getAll).toHaveBeenCalledTimes(1);
      expect(response.body[0]).toEqual({ name: 'Bryte', race: 'Fairy' });
    });

    test('400 error', async () => {
      (getAll as jest.Mock).mockRejectedValueOnce(
        new Error('Something went wrong')
      );
      const response = await request.get('/characters');
      expect(getAll).toHaveBeenCalledTimes(1);
      expect(response.error).toBeTruthy();
    });

    test('400 databaseError', async () => {
      (getAll as jest.Mock).mockRejectedValueOnce(
        new DatabaseError('Something went wrong', 'NO_CHAR')
      );
      const response = await request.get('/characters');
      expect(getAll).toHaveBeenCalledTimes(1);
      expect(response.error).toBeTruthy();
    });
  });

  describe('the /characters/:id route', () => {
    test('200 should return fine', async () => {
      (getOne as jest.Mock).mockResolvedValueOnce(
        Promise.resolve({
          name: 'Bryte',
          race: 'Fairy',
          skills: [],
          weapons: [],
          spells: []
        })
      );
      const response = await request.get('/characters/00C12kHusMw');
      expect(getOne).toHaveBeenCalledTimes(1);
      expect(getOne).toHaveBeenLastCalledWith('00C12kHusMw');
      expect(response.body).toEqual({
        name: 'Bryte',
        race: 'Fairy',
        skills: [],
        weapons: [],
        spells: []
      });
    });

    test('400 should return error', async () => {
      (getOne as jest.Mock).mockRejectedValueOnce(
        new Error('Something went wrong')
      );
      const response = await request.get('/characters/00C12kHusMw');
      expect(getOne).toHaveBeenCalledTimes(1);
      expect(getOne).toHaveBeenLastCalledWith('00C12kHusMw');
      expect(response.error).toBeTruthy();
    });

    test('400 should return DatabaseError', async () => {
      (getOne as jest.Mock).mockRejectedValueOnce(
        new DatabaseError('Something went wrong', 'NO_USER')
      );
      const response = await request.get('/characters/00C12kHusMw');
      expect(getOne).toHaveBeenCalledTimes(1);
      expect(getOne).toHaveBeenLastCalledWith('00C12kHusMw');
      expect(response.error).toBeTruthy();
    });
  });
  describe('the /characters/user/:userId route', () => {
    test('200 should return fine', async () => {
      (getUserCharacters as jest.Mock).mockResolvedValueOnce(
        Promise.resolve({ name: 'Bryte', race: 'Fairy', id: '00C2udLownM' })
      );
      const response = await request.get('/characters/user/00U12kHusMw');
      expect(getUserCharacters).toHaveBeenCalledTimes(1);
      expect(getUserCharacters).toHaveBeenLastCalledWith('00U12kHusMw');
      expect(response.body).toEqual({
        name: 'Bryte',
        race: 'Fairy',
        id: '00C2udLownM'
      });
    });

    test('400 should return error', async () => {
      (getUserCharacters as jest.Mock).mockRejectedValueOnce(
        new Error('Something went wrong')
      );
      const response = await request.get('/characters/user/00U12kHusMw');
      expect(getUserCharacters).toHaveBeenCalledTimes(1);
      expect(getUserCharacters).toHaveBeenLastCalledWith('00U12kHusMw');
      expect(response.error).toBeTruthy();
    });

    test('400 should return DatabaseError', async () => {
      (getUserCharacters as jest.Mock).mockRejectedValueOnce(
        new DatabaseError('Something went wrong', 'NO_USER')
      );
      const response = await request.get('/characters/user/00U12kHusMw');
      expect(getUserCharacters).toHaveBeenCalledTimes(1);
      expect(getUserCharacters).toHaveBeenLastCalledWith('00U12kHusMw');
      expect(response.error).toBeTruthy();
    });
  });

  describe('the /characters/:userId route', () => {
    test('200 should return fine', async () => {
      (updateOne as jest.Mock).mockResolvedValueOnce(
        Promise.resolve({
          id: 'character id',
          name: 'test character'
        })
      );
      const response = await request
        .post('/characters/00U12kHusMw')
        .send({ character: { id: 'character id', name: 'test character' } });
      expect(updateOne).toHaveBeenCalledTimes(1);
      expect(updateOne).toHaveBeenLastCalledWith('00U12kHusMw', {
        id: 'character id',
        name: 'test character'
      });
      expect(response.body).toEqual({
        id: 'character id',
        name: 'test character'
      });
    });

    test('400 should return error', async () => {
      (updateOne as jest.Mock).mockRejectedValueOnce(
        new Error('Something went wrong')
      );
      const response = await request
        .post('/characters/00U12kHusMw')
        .send({ character: { id: 'character id', name: 'test character' } });
      expect(updateOne).toHaveBeenCalledTimes(1);
      expect(updateOne).toHaveBeenLastCalledWith('00U12kHusMw', {
        id: 'character id',
        name: 'test character'
      });
      expect(response.error).toBeTruthy();
    });

    test('400 should return DatabaseError', async () => {
      (updateOne as jest.Mock).mockRejectedValueOnce(
        new DatabaseError('Something went wrong', 'NO_USER')
      );
      const response = await request
        .post('/characters/00U12kHusMw')
        .send({ character: { id: 'character id', name: 'test character' } });
      expect(updateOne).toHaveBeenCalledTimes(1);
      expect(updateOne).toHaveBeenLastCalledWith('00U12kHusMw', {
        id: 'character id',
        name: 'test character'
      });
      expect(response.error).toBeTruthy();
    });
  });
});
