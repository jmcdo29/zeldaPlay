import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Auth, Login, Signup, User } from '@tabletop-companion/api-interface';
import { compareSync } from 'bcrypt';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { JwtPayload } from './models/jwtPayload';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  login(login: Login): Observable<Auth> {
    return this.userService.getByEmail(login.email).pipe(
      map((user) => {
        if (compareSync(login.password, user.password)) {
          return {
            id: user.id,
            token: this.signToken({
              id: user.id,
              email: user.email,
              role: user.role
            })
          };
        } else {
          throw new UnauthorizedException('Invalid email or password.');
        }
      })
    );
  }

  signup(signup: Signup): Observable<Auth> {
    return this.userService.getByEmail(signup.email).pipe(
      switchMap((existingUser) => {
        if (existingUser) {
          throw new BadRequestException('Email already in use');
        } else {
          return this.userService.insertUser(signup);
        }
      }),
      map((newUser) => {
        return {
          id: newUser.id,
          token: this.signToken({
            id: newUser.id,
            email: signup.email,
            role: signup.role
          })
        };
      })
    );
  }

  private signToken(tokenUser: JwtPayload): string {
    return this.jwtService.sign(tokenUser);
  }

  validateUser(payload: JwtPayload): Observable<User> {
    return this.userService.getByEmail(payload.email);
  }
}
