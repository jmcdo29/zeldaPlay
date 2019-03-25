import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtDTO, JwtReturnDTO, NewUserDTO, UserDTO } from '@Body/index';
import { DbPlayer, DbQuestion } from '@DbModel/index';
import { UserService } from '@User/user.service';
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  login(payload: UserDTO): Observable<JwtReturnDTO> {
    return this.userService.login(payload).pipe(this.signToken());
  }

  signup(newUser: NewUserDTO): Observable<JwtReturnDTO> {
    return this.userService.signup(newUser).pipe(this.signToken());
  }

  validateUser(payload: JwtDTO): Observable<DbPlayer> {
    return this.userService.findUserByEmail(payload.email).pipe(
      map((users) => {
        if (users.length === 0) {
          throw new UnauthorizedException(
            'Login invalid. Please log in again.'
          );
        } else {
          return users[0];
        }
      })
    );
  }

  signToken(): OperatorFunction<any, JwtReturnDTO> {
    return map((user) => {
      const accessToken = this.jwtService.sign({
        email: user.pEmail,
        id: user.pId,
        provider: 'local'
      });
      return {
        accessToken,
        id: user.pId
      };
    });
  }
}
