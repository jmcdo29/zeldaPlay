import { Test, TestingModule } from '@nestjs/testing';
import { DbUserService } from './db-user.service';
import { DbPlayer } from '@Db/models/db_player.model';
import { DbService } from '@Db/db.service';

const mockDb = {
  query: jest.fn().mockReturnValue([new DbPlayer()])
};

const email = 'test@test.email';

describe('DbUserService', () => {
  let service: DbUserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DbUserService,
        {
          provide: DbService,
          useValue: mockDb
        }
      ]
    }).compile();
    service = module.get<DbUserService>(DbUserService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should query by email', async () => {
    const players = await service.findByEmail(email);
    expect(players).toEqual([new DbPlayer()]);
  });
  it('should run player insert', async () => {
    const players = await service.signup(email, 'Passw0rd!');
    expect(players).toEqual([new DbPlayer()]);
  });
  it('should find player to log in', async () => {
    const players = await service.login(email);
    expect(players).toEqual([new DbPlayer()]);
  });
});
