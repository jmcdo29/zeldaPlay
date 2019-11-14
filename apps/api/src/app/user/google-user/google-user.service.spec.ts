import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../../database/database.service';
import { GoogleUserService } from './google-user.service';

describe('GoogleUserService', () => {
  let service: GoogleUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GoogleUserService,
        {
          provide: DatabaseService,
          useValue: jest.fn(),
        },
      ],
    }).compile();

    service = module.get<GoogleUserService>(GoogleUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
