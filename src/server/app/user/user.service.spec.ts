import { Test, TestingModule } from '@nestjs/testing';

import { UserService } from '@User/user.service';
import { DbUserService } from './db-user/db-user.service';

const mockRepo = {};

describe('UsersService', () => {
  let service: UserService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: DbUserService,
          useValue: mockRepo
        }
      ]
    }).compile();
    service = module.get<UserService>(UserService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
