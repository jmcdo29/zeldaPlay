import { createMock } from '@golevelup/nestjs-testing';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { DatabaseService } from '../../database/database.service';
import { GoogleSub } from '../auth/models/google.payload';
import { GoogleUser } from '../user/models/google-user.model';
import { GoogleUserService } from './google-user.service';

const googleUser: GoogleUser = {
  id: 'some id',
  roles: ['player'],
  email: 'test@test.email',
  firstName: 'test',
  lastName: 'test',
  googleId: 'googleId',
};

describe('GoogleUserService', () => {
  let service: GoogleUserService;
  let db: DatabaseService<GoogleUser>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GoogleUserService,
        {
          provide: DatabaseService,
          useValue: {
            query: jest.fn().mockReturnValue(of([googleUser])),
            insert: jest.fn().mockReturnValue(of([googleUser])),
          },
        },
      ],
    }).compile();

    service = module.get<GoogleUserService>(GoogleUserService);
    db = module.get<DatabaseService<GoogleUser>>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Find Google User', () => {
    const complete = (spy: jest.SpyInstance, done: () => void) => () => {
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith({
        query:
          'id as id, roles as roles, email as email, ' +
          'first_name as "firstName", last_name as "lastName", ' +
          'google_id as "googleId"',
        where: 'google_id = $1',
        variables: ['googleId'],
      });
      done();
    };

    let querySpy: jest.SpyInstance;

    beforeEach(() => {
      querySpy = jest.spyOn(db, 'query');
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should find a google user', (done) => {
      service.getByGoogleId('googleId').subscribe({
        next: (val) => {
          expect(val).toEqual(googleUser);
        },
        error: (err) => {
          throw err;
        },
        complete: complete(querySpy, done),
      });
    });
    it('should find no user', (done) => {
      (db.query as jest.Mock).mockReturnValueOnce(of([]));
      service.getByGoogleId('googleId').subscribe({
        next: (val) => {
          expect(val).toEqual(undefined);
        },
        error: (err) => {
          throw err;
        },
        complete: complete(querySpy, done),
      });
    });
  });
  describe('Create Google User', () => {
    let insertSpy: jest.SpyInstance;
    const complete = (spy: jest.SpyInstance, done: () => void) => () => {
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith({
        query:
          'email, first_name, last_name, consent_to_email, roles, google_id',
        where: '$1, $2, $3, $4, $5, $6',
        variables: [
          googleUser.email,
          googleUser.firstName,
          googleUser.lastName,
          true,
          ['player'],
          googleUser.googleId,
        ],
      });
      done();
    };
    beforeEach(() => {
      insertSpy = jest.spyOn(db, 'insert');
    });
    afterEach(() => {
      jest.clearAllMocks();
    });
    it('should successfully insert the user', (done) => {
      service
        .createNewGoogleUser(
          createMock<GoogleSub>({
            id: 'googleId',
            name: {
              familyName: 'test',
              givenName: 'test',
            },
            emails: [{ value: 'test@test.email', verified: true }],
          }),
        )
        .subscribe({
          next: (val) => {
            expect(val).toEqual(googleUser);
          },
          error: (err) => {
            throw err;
          },
          complete: complete(insertSpy, done),
        });
    });
  });
});
