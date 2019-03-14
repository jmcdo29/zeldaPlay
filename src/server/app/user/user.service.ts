import {
  ConflictException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { compareSync, hashSync } from 'bcryptjs';

import { NewUserDTO, UserDTO } from '@Body/index';
import { DbPlayer } from '@DbModel/index';
import { Observable } from 'rxjs';
import { flatMap, map, tap } from 'rxjs/operators';
import { DbUserService } from './db-user/db-user.service';

const noUser = 'No user found for email ';

const registerFirst = '. Please register first.';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DbUserService) {}

  login(user: UserDTO): Observable<DbPlayer> {
    return this.dbService.login(user.email).pipe(
      map((dbUsers) => {
        const dbUser = dbUsers[0];
        if (!dbUser) {
          throw new UnauthorizedException(noUser + user.email + registerFirst);
        } else if (compareSync(user.password, dbUser.pPassword)) {
          return dbUser;
        } else {
          throw new UnauthorizedException('Invalid email or password.');
        }
      })
    );
  }

  signup(user: NewUserDTO): Observable<DbPlayer> {
    return this.dbService.findByEmail(user.email).pipe(
      tap((existingUser) => {
        if (existingUser.length > 0) {
          throw new ConflictException(
            'That email already exists. Please log in or choose another email.'
          );
        }
      }),
      flatMap(() =>
        this.dbService.signup(user.email, hashSync(user.password, 12))
      ),
      map((players) => players[0])
    );
  }

  findUserByEmail(email: string): Observable<DbPlayer[]> {
    return this.dbService.findByEmail(email).pipe(
      tap((users) => {
        if (!users.length) {
          throw new UnauthorizedException(noUser + email + registerFirst);
        } else {
          return users;
        }
      })
    );
  }
}
