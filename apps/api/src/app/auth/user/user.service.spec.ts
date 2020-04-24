import { createMock } from '@golevelup/nestjs-testing';
import { Test } from '@nestjs/testing';
import { OgmaService } from '@ogma/nestjs-module';
import { of } from 'rxjs';

import { DatabaseService } from '../../database/database.service';
import { UserDTO } from './models';
import { UserService } from './user.service';

const mockEmail = 'test@test.com';
const mockHashPass = 'someHashedPassword';
const mockPass = 'password';
const mockOtherHashPass = 'SomeOtherHashedPassword';

const userObserver = (done: () => void) => ({
  next(value: UserDTO) {
    expect(value).toEqual({
      id: 'USR-TEST1',
      email: mockEmail,
      role: ['player'],
      password: mockHashPass,
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
          provide: OgmaService,
          useValue: createMock<OgmaService>(),
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
            email: mockEmail,
            role: ['player'],
            password: mockHashPass,
          },
          {
            id: 'USR-TEST2',
            email: 'test@test.org',
            role: ['player'],
            password: mockOtherHashPass,
          },
        ]),
      );
      service.getByEmail(mockEmail).subscribe(userObserver(done));
    });
  });
  describe('getById', () => {
    it('should return the user with the id', (done) => {
      db.query = jest.fn().mockReturnValueOnce(
        of([
          {
            id: 'USR-TEST1',
            email: mockEmail,
            role: ['player'],
            password: mockHashPass,
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
          email: mockEmail,
          password: mockPass,
          confirmationPassword: mockPass,
          consentToEmail: true,
          firstName: 'Test',
          lastName: 'McTesting',
          role: ['player'],
        })
        .subscribe({
          next(value) {
            expect(dbSpy).toBeCalledTimes(1);
            expect(value).toEqual({
              email: mockEmail,
              password: mockPass,
              confirmationPassword: mockPass,
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
