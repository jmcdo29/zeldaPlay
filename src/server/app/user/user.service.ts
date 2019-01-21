import {
  ConflictException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { consoleLogger as scribe } from 'mc-scribe';

import { NewUserDTO } from '@Auth/interfaces/new_user.dto';
import { UserDTO } from '@Auth/interfaces/user.dto';
import { DbPlayer } from '@DbModel/db_player.model';
import { DbUserService } from './db-user/db-user.service';

const noUser = 'No user found for email ';

const registerFirst = '. Please register first.';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DbUserService) {}

  async login(user: UserDTO): Promise<DbPlayer> {
    const dbUsers = await this.dbService.login(user.email);
    const dbUser = dbUsers[0];
    if (!dbUser) {
      throw new UnauthorizedException(noUser + user.email + registerFirst);
    } else if (await compare(user.password, dbUser.pPassword)) {
      return dbUser;
    } else {
      throw new UnauthorizedException('Invalid email or password.');
    }
  }

  async signup(user: NewUserDTO): Promise<DbPlayer> {
    // tslint:disable-next-line:no-duplicate-string
    scribe('INFO', 'user.email', user.email);
    scribe('INFO', 'Before findByEmail query');
    const existingUser = await this.dbService.findByEmail(user.email);
    scribe('INFO', 'After findByEmail query');
    scribe('INFO', 'existingUser', existingUser);
    if (existingUser) {
      return Promise.reject(
        new ConflictException(
          'That email already exists. Please log in or choose another email.'
        )
      );
    }
    const newPlayers = await this.dbService.signup(
      user.email,
      await hash(user.password, 12)
    );
    const newPlayer = newPlayers[0];
    newPlayer.pEmail = user.email;
    return newPlayer;
  }

  async findUserByEmail(email: string): Promise<DbPlayer[]> {
    const users = await this.dbService.findByEmail(email);
    if (!users.length) {
      throw new UnauthorizedException(noUser + email + registerFirst);
    } else {
      return users;
    }
  }

  async findUserByToken(token: string): Promise<DbPlayer[]> {
    const users = await this.dbService.findByToken(token);
    if (!users.length) {
      throw new UnauthorizedException(registerFirst);
    } else {
      return users;
    }
  }
}
