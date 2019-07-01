import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

import { DatabaseService } from '../database/database.service';
import { UserService } from './user.service';

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
            query: jest.fn()
          }
        }
      ]
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
              password: 'someHashedPassword'
            },
            {
              id: 'USR-TEST2',
              email: 'test@test.org',
              role: ['player'],
              password: 'SomeOtherHashedPassword'
            }
          ])
        );
      service.getByEmail('test@test.com').subscribe(
        (user) => {
          expect(user).toEqual({
            id: 'USR-TEST1',
            email: 'test@test.com',
            role: ['player'],
            password: 'someHashedPassword'
          });
        },
        (error) => {
          throw new Error(error);
        },
        () => done()
      );
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
              password: 'someHashedPassword'
            }
          ])
        );
      service.getById({ id: 'USR-TEST1' }).subscribe(
        (user) => {
          expect(user).toEqual({
            id: 'USR-TEST1',
            email: 'test@test.com',
            role: ['player'],
            password: 'someHashedPassword'
          });
        },
        (error) => {
          throw new Error(error);
        },
        () => done()
      );
    });
  });
  describe('insertUser', () => {
    it('should insert the user', (done) => {
      const dbSpy = jest
        .spyOn(module.get(DatabaseService), 'query')
        .mockReturnValueOnce(
          of([
            {
              id: 'USR-TEST1'
            }
          ])
        );
      service
        .insertUser({
          email: 'test@test.com',
          password: 'password',
          confirmationPassword: 'password',
          consentToEmail: true,
          firstName: 'Test',
          lastName: 'McTesting',
          role: ['player']
        })
        .subscribe(
          (user) => {
            expect(dbSpy).toBeCalledTimes(1);
            expect(user).toEqual({
              email: 'test@test.com',
              password: 'password',
              confirmationPassword: 'password',
              consentToEmail: true,
              firstName: 'Test',
              lastName: 'McTesting',
              role: ['player'],
              isActive: true,
              id: 'USR-TEST1'
            });
            done();
          },
          (error) => {
            throw new Error(error);
          },
          () => done()
        );
    });
  });
  describe('updateUser', () => {
    it('should update the user', (done) => {
      service.updateUser({} as any, { id: 'USR-TEST' }).subscribe(
        (next) => {},
        (error) => {
          throw new Error(error);
        },
        () => done()
      );
    });
  });
  describe('deleteUser', () => {
    it('should deactivate the user', (done) => {
      const dbSpy = jest
        .spyOn(module.get(DatabaseService), 'query')
        .mockReturnValueOnce(of([]));
      service.deleteUser({ id: 'USR-TEST' }).subscribe(
        (next) => {
          expect(dbSpy).toBeCalledTimes(2);
        },
        (error) => {
          throw new Error(error);
        },
        () => done()
      );
    });
  });
});
