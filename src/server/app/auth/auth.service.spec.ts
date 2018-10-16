import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

import { UserService } from '@User/user.service';

process.env.TOKEN_SECRET = 'some secret';
// TODO: Still needs to be fixed
// HACK: Set test to true to pass.
describe('AuthService', () => {
  let service: AuthService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({ secretOrPrivateKey: 'aKey' })],
      providers: [
        AuthService,
        JwtStrategy,
        {
          provide: UserService,
          useValue: {}
        }
      ]
    }).compile();
    service = module.get<AuthService>(AuthService);
  });
  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
