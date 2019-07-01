import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

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
    resolver.getUser({ id: 'USR-TEST1' }).subscribe(
      (user) => {
        expect(user).toEqual({
          id: 'USR-TEST1',
          email: 'test@test.com',
          role: ['player']
        });
      },
      (error) => {
        throw new Error(error);
      },
      () => done()
    );
  });
  it('should update a user', (done) => {
    resolver.updateUser({ id: 'USR-TEST1' }, {}).subscribe(
      (user) => {},
      (error) => {
        throw new Error(error);
      },
      () => done()
    );
  });
  it('should delete a user', (done) => {
    resolver.deleteUser({ id: 'USR-TEST1' }).subscribe(
      (user) => {},
      (error) => {
        throw new Error(error);
      },
      () => done()
    );
  });
});
