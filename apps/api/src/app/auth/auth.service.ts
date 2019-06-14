import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginBody, User } from '@tabletop-companion/api-interface';
import { compareSync } from 'bcrypt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { JwtPayload } from './models/jwtPayload';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  signIn(login: LoginBody): Observable<string> {
    return this.userService.getByEmail(login.email).pipe(
      map((user) => {
        if (compareSync(login.password, user.password)) {
          return this.signToken({ email: user.email, role: user.role });
        } else {
          throw new UnauthorizedException('Invalid email or password.');
        }
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
