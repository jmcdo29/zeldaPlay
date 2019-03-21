import { Test, TestingModule } from '@nestjs/testing';
import { DbUserService } from './db-user.service';

import { DbService } from '@Db/db.service';
import { DbPlayer } from '@Db/models/db_player.model';
import { of } from 'rxjs';

const mockDb = {
  query: jest.fn().mockReturnValue(of([new DbPlayer()]))
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
  it('should query by email', () => {
    service.findByEmail(email).subscribe((players) => {
      expect(players).toEqual([new DbPlayer()]);
    });
  });
  it('should run player insert', () => {
    service.signup(email, 'Passw0rd!').subscribe((players) => {
      expect(players).toEqual([new DbPlayer()]);
    });
  });
  it('should find player to log in', () => {
    service.login(email).subscribe((players) => {
      expect(players).toEqual([new DbPlayer()]);
    });
  });
});
