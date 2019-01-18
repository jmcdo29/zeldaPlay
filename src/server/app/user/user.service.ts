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
    const dbUser = await this.dbService.login(user.email);
    if (!dbUser) {
      throw new UnauthorizedException(noUser + user.email + registerFirst);
    } else if (await compare(user.password, dbUser.pPassword)) {
      return dbUser;
    } else {
      throw new UnauthorizedException('Invalid email or password.');
    }
  }

  async signup(user: NewUserDTO): Promise<DbPlayer> {
    scribe('INFO', 'user.email', user.email);
    const existingUser = await this.dbService.findByEmail(user.email);
    scribe('INFO', 'existingUser', existingUser);
    if (existingUser) {
      return Promise.reject(
        new ConflictException(
          'That email already exists. Please log in or choose another email.'
        )
      );
    }
    const newPlayer = await this.dbService.signup(
      user.email,
      await hash(user.password, 12)
    );
    newPlayer.pEmail = user.email;
    return newPlayer;
  }

  async findUserByEmail(email: string): Promise<DbPlayer> {
    const user = await this.dbService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException(noUser + email + registerFirst);
    } else {
      return user;
    }
  }

  async findUserByToken(token: string): Promise<DbPlayer> {
    const user = await this.dbService.findByToken(token);
    if (!user) {
      throw new UnauthorizedException(registerFirst);
    } else {
      return user;
    }
  }
}
