import { Test } from '@nestjs/testing';
import { of } from 'rxjs';

import { DatabaseService } from '../database/database.service';
import { LoggerService } from '../logger/logger.service';
import { UserDTO } from './models';
import { UserService } from './user.service';

const userObserver = (done: () => void) => ({
  next(value: UserDTO) {
    expect(value).toEqual({
      id: 'USR-TEST1',
      email: 'test@test.com',
      role: ['player'],
      password: 'someHashedPassword',
    });
  },
  error(error: Error) {
    throw error;
  },
  complete() {
    done();
  },
});

describe('UserService', () => {
  let service: UserService;
  let db: DatabaseService<UserDTO>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: DatabaseService,
          useValue: {
            query: jest.fn(),
            insert: jest.fn(),
            update: jest.fn(),
            updateMany: jest.fn(),
          },
        },
        {
          provide: LoggerService,
          useValue: {
            log: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    db = module.get<DatabaseService<UserDTO>>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getByEmail', () => {
    it('should get the first corresponding user', (done) => {
      db.query = jest.fn().mockReturnValueOnce(
        of([
          {
            id: 'USR-TEST1',
            email: 'test@test.com',
            role: ['player'],
            password: 'someHashedPassword',
          },
          {
            id: 'USR-TEST2',
            email: 'test@test.org',
            role: ['player'],
            password: 'SomeOtherHashedPassword',
          },
        ]),
      );
      service.getByEmail('test@test.com').subscribe(userObserver(done));
    });
  });
  describe('getById', () => {
    it('should return the user with the id', (done) => {
      db.query = jest.fn().mockReturnValueOnce(
        of([
          {
            id: 'USR-TEST1',
            email: 'test@test.com',
            role: ['player'],
            password: 'someHashedPassword',
          },
        ]),
      );
      service
        .getById({ id: 'USR-TEST1' })
        .subscribe(userObserver(done))
        .unsubscribe();
    });
  });
  describe('insertUser', () => {
    it('should insert the user', (done) => {
      const dbSpy = jest.spyOn(db, 'insert').mockReturnValueOnce(
        of([
          {
            id: 'USR-TEST1',
          },
        ] as any),
      );
      service
        .insertUser({
          email: 'test@test.com',
          password: 'password',
          confirmationPassword: 'password',
          consentToEmail: true,
          firstName: 'Test',
          lastName: 'McTesting',
          role: ['player'],
        })
        .subscribe({
          next(value) {
            expect(dbSpy).toBeCalledTimes(1);
            expect(value).toEqual({
              email: 'test@test.com',
              password: 'password',
              confirmationPassword: 'password',
              consentToEmail: true,
              firstName: 'Test',
              lastName: 'McTesting',
              role: ['player'],
              isActive: true,
              id: 'USR-TEST1',
            });
          },
          error(error) {
            throw new Error(error.message);
          },
          complete() {
            done();
          },
        });
    });
  });
  describe('updateUser', () => {
    it('should update the user', (done) => {
      service
        .updateUser({ id: 'USR-TEST' })
        .subscribe({
          next(value) {},
          error(error) {
            throw new Error(error);
          },
          complete() {
            done();
          },
        })
        .unsubscribe();
    });
  });
  describe('deleteUser', () => {
    it('should deactivate the user', (done) => {
      const dbSpy = jest.spyOn(db, 'update').mockReturnValueOnce(of([]));
      service
        .deleteUser({ id: 'USR-TEST' })
        .subscribe({
          next() {
            expect(dbSpy).toBeCalledTimes(1);
          },
          error(error) {
            throw new Error(error.message);
          },
          complete() {
            done();
          },
        })
        .unsubscribe();
    });
  });
});
