import { Test, TestingModule } from '@nestjs/testing';
import { hashSync } from 'bcryptjs';
import { of } from 'rxjs';

import { DbPlayer } from '@DbModel/index';
import { UserService } from '@User/user.service';
import { DbUserService } from './db-user/db-user.service';

const mockRepo = {
  login: jest.fn(),
  findByEmail: jest.fn(),
  signup: jest.fn()
};

const email = 'test@test.email';
const pWord = 'Passw0rd!';
const user = { email, password: pWord };
const newUser = {
  email,
  password: pWord,
  confirmationPassword: pWord,
  recovery: []
};

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
  describe('#login', () => {
    it('should allow a user to login', () => {
      const passHash = hashSync(pWord, 12);
      const newPlayer = new DbPlayer();
      newPlayer.pPassword = passHash;
      mockRepo.login.mockReturnValueOnce(of([newPlayer]));
      service.login(user).subscribe((player) => {
        expect(player).toBe(newPlayer);
      });
    });
    it('should not find the email', () => {
      mockRepo.login.mockReturnValueOnce(of([]));
      service.login(user).subscribe(
        () => {},
        (err) => {
          expect(err.message.message).toBe(
            'No user found for email ' + email + '. Please register first.'
          );
        }
      );
    });
    it('should find the email, but be an invalid pWord', () => {
      const passHash = hashSync(pWord + '$', 12);
      const newPlayer = new DbPlayer();
      newPlayer.pPassword = passHash;
      mockRepo.login.mockReturnValueOnce(of([newPlayer]));
      service.login(user).subscribe(
        () => {
          throw new Error('Should not be here');
        },
        (err) => {
          expect(err.message.message).toBe('Invalid email or password.');
        }
      );
    });
  });
  describe('#signup', () => {
    it('should sign up a new user', () => {
      const newPlayer = new DbPlayer();
      newPlayer.pEmail = email;
      mockRepo.findByEmail.mockReturnValueOnce(of([]));
      mockRepo.signup.mockReturnValueOnce(of([newPlayer]));
      service.signup(newUser).subscribe((signUp) => {
        expect(signUp).toEqual(newPlayer);
      });
    });
    it('should throw an error for an already existing user', () => {
      mockRepo.findByEmail.mockReturnValueOnce(of([new DbPlayer()]));
      service.signup(newUser).subscribe(
        () => {},
        (err) => {
          expect(err.message.message).toBe(
            'That email already exists. Please log in or choose another email.'
          );
        }
      );
    });
  });
  describe('#findByEmail', () => {
    it('should find users by email', () => {
      mockRepo.findByEmail.mockReturnValueOnce(of([new DbPlayer()]));
      service.findUserByEmail(email).subscribe((users) => {
        expect(users).toEqual([new DbPlayer()]);
      });
    });
    it('should throw an error with no email', () => {
      mockRepo.findByEmail.mockReturnValueOnce(of([]));
      service.findUserByEmail(email).subscribe(
        () => {},
        (err) => {
          expect(err.status).toBe(401);
          expect(err.message.message).toBe(
            'No user found for email ' + email + '. Please register first.'
          );
        }
      );
    });
  });
});
