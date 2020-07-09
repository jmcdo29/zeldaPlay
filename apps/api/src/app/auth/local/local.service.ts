import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { compare } from 'bcrypt';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthDTO, LoginDTO, SignupDTO } from '../auth/models';
import { UserService } from '../user/user.service';

@Injectable()
export class LocalService {
  constructor(private readonly userService: UserService) {}

  login(login: LoginDTO): Observable<AuthDTO> {
    return this.userService.getByEmail(login.email).pipe(
      switchMap(async (user) => {
        if (!user) {
          throw new UnauthorizedException('Invalid email or password.');
        }
        if (user.password && (await compare(login.password, user.password))) {
          return {
            id: user.id,
          };
        } else if (!user.password) {
          throw new BadRequestException(
            'Found social account with matching password. Please link accounts.',
          );
        } else {
          throw new UnauthorizedException('Invalid email or password.');
        }
      }),
    );
  }

  signup(signup: SignupDTO): Observable<AuthDTO> {
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
        };
      }),
    );
  }
}
