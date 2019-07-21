import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@tabletop-companion/api-interface';
import { of } from 'rxjs';

import { DatabaseService } from '../database/database.service';
import { UserService } from './user.service';

const userObserver = (done: () => void) => ({
  next(value: User) {
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
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: DatabaseService,
          useValue: {
            query: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getByEmail', () => {
    it('should get the first corresponding user', (done) => {
      const dbSpy = jest
        .spyOn(module.get(DatabaseService), 'query')
        .mockReturnValueOnce(
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
      const dbSpy = jest
        .spyOn(module.get(DatabaseService), 'query')
        .mockReturnValueOnce(
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
      const dbSpy = jest
        .spyOn(module.get(DatabaseService), 'query')
        .mockReturnValueOnce(
          of([
            {
              id: 'USR-TEST1',
            },
          ]),
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
      const dbSpy = jest
        .spyOn(module.get(DatabaseService), 'query')
        .mockReturnValueOnce(of([]));
      service
        .deleteUser({ id: 'USR-TEST' })
        .subscribe({
          next(value) {
            expect(dbSpy).toBeCalledTimes(2);
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
