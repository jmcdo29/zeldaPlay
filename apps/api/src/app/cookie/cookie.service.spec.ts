import { Test, TestingModule } from '@nestjs/testing';
import { CookieService } from './cookie.service';

describe('CookieService', () => {
  let service: CookieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CookieService],
    }).compile();

    service = module.get<CookieService>(CookieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
