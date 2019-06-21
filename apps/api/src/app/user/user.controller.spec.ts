import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('User Controller', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [UserController],
      providers: [
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

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get a user', (done) => {
    controller.getUser({ id: 'USR-TEST1' }).subscribe(
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
    controller.updateAccount({}, { id: 'USR-TEST1' }).subscribe(
      (user) => {},
      (error) => {
        throw new Error(error);
      },
      () => done()
    );
  });
  it('should delete a user', (done) => {
    controller.deactivateAccount({ id: 'USR-TEST1' }).subscribe(
      (user) => {},
      (error) => {
        throw new Error(error);
      },
      () => done()
    );
  });
});
