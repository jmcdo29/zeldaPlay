import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@tabletop-companion/api-interface';
import { of } from 'rxjs';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

const userObserver = (done: () => void) => ({
  next(value: User) {
    expect(value).toEqual({
      id: 'USR-TEST1',
      email: 'test@test.com',
      role: ['player']
    });
  },
  error(error: Error) {
    throw error;
  },
  complete() {
    done();
  }
});

const emptyObserver = (done: () => void) => ({
  next(value: User) {},
  error(error: Error) {
    throw error;
  },
  complete() {
    done();
  }
});

describe('UserResolver', () => {
  let resolver: UserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: {
            getById: jest.fn().mockReturnValue(
              of({
                id: 'USR-TEST1',
                email: 'test@test.com',
                role: ['player']
              })
            ),
            updateUser: jest.fn().mockReturnValue(of()),
            deleteUser: jest.fn().mockReturnValue(of())
          }
        }
      ]
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
  it('should get a user', (done) => {
    resolver
      .getUser({ id: 'USR-TEST1' })
      .subscribe(userObserver(done))
      .unsubscribe();
  });
  it('should update a user', (done) => {
    resolver
      .updateUser({ id: 'USR-TEST1' }, {})
      .subscribe(emptyObserver(done))
      .unsubscribe();
  });
  it('should delete a user', (done) => {
    resolver
      .deleteUser({ id: 'USR-TEST1' })
      .subscribe(emptyObserver(done))
      .unsubscribe();
  });
});
