import { Test, TestingModule } from '@nestjs/testing';
import { hash } from 'bcryptjs';

import { UserService } from '@User/user.service';
import { DbUserService } from './db-user/db-user.service';
import { DbPlayer } from '@DbModel/index';

const mockRepo = {
  login: jest.fn(),
  findByEmail: jest.fn(),
  signup: jest.fn()
};

const email = 'test@test.email';
const password = 'Passw0rd!';
const user = { email, password };
const newUser = {
  email,
  password,
  confirmationPassword: password,
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
    it('should allow a user to login', async () => {
      const passHash = await hash(password, 12);
      const newPlayer = new DbPlayer();
      newPlayer.pPassword = passHash;
      mockRepo.login.mockReturnValueOnce([newPlayer]);
      const player = await service.login(user);
      expect(player).toBe(newPlayer);
    });
    it('should not find the email', async () => {
      mockRepo.login.mockReturnValueOnce([]);
      try {
        await service.login(user);
      } catch (err) {
        expect(err.message.message).toBe(
          'No user found for email ' + email + '. Please register first.'
        );
      }
    });
    it('should find the email, but be an invalid password', async () => {
      const passHash = await hash(password + '$', 12);
      const newPlayer = new DbPlayer();
      newPlayer.pPassword = passHash;
      mockRepo.login.mockReturnValueOnce([newPlayer]);
      try {
        await service.login(user);
      } catch (err) {
        expect(err.message.message).toBe('Invalid email or password.');
      }
    });
  });
  describe('#signup', () => {
    it('should sign up a new user', async () => {
      const newPlayer = new DbPlayer();
      newPlayer.pEmail = email;
      mockRepo.findByEmail.mockReturnValueOnce([]);
      mockRepo.signup.mockReturnValueOnce([newPlayer]);
      const signUp = await service.signup(newUser);
      expect(signUp).toEqual(newPlayer);
    });
    it('should throw an error for an already existing user', async () => {
      mockRepo.findByEmail.mockReturnValueOnce([new DbPlayer()]);
      try {
        await service.signup(newUser);
      } catch (err) {
        expect(err.message.message).toBe(
          'That email already exists. Please log in or choose another email.'
        );
      }
    });
  });
  describe('#findByEmail', () => {
    it('should find users by email', async () => {
      mockRepo.findByEmail.mockReturnValueOnce([new DbPlayer()]);
      const users = await service.findUserByEmail(email);
      expect(users).toEqual([new DbPlayer()]);
    });
    it('should throw an error with no email', async () => {
      mockRepo.findByEmail.mockReturnValueOnce([]);
      try {
        await service.findUserByEmail(email);
      } catch (err) {
        expect(err.message.message).toBe(
          'No user found for email ' + email + '. Please register first.'
        );
      }
    });
  });
});
