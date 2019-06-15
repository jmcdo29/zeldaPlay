import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('Auth Controller', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest
              .fn()
              .mockReturnValue(
                of(Math.floor(Math.random() * 1000).toString(8))
              ),
            signup: jest
              .fn()
              .mockReturnValue(of(Math.floor(Math.random() * 1000).toString(8)))
          }
        }
      ]
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should return a value for login', (done) => {
    controller
      .login({ email: 'testEmail', password: 'testPassword' })
      .subscribe((result) => {
        expect(typeof result).toBe('string');
        done();
      });
  });
  it('should return a value for signup', (done) => {
    controller
      .signup({
        email: 'testEmail',
        password: 'testPassword',
        confirmationPassword: 'testPassword',
        consentToEmail: false,
        firstName: 'Test',
        lastName: 'Test',
        role: ['player']
      })
      .subscribe((result) => {
        expect(typeof result).toBe('string');
        done();
      });
  });
});
