import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { compare } from 'bcrypt';
import { Observable, of } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { GoogleUserService } from '../google-user/google-user.service';
import { GoogleUser } from '../user/models/google-user.model';
import { UserService } from '../user/user.service';
import { AuthDTO, LoginDTO, SignupDTO } from './models';
import { GoogleSub } from './models/google.payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly googleUserService: GoogleUserService,
  ) {}

  login(login: LoginDTO): Observable<AuthDTO> {
    return this.userService.getByEmail(login.email).pipe(
      mergeMap(async (user) => {
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

  findOrCreateGoogleUser(googleUser: GoogleSub): Observable<GoogleUser> {
    return this.googleUserService.getByGoogleId(googleUser.id).pipe(
      switchMap((user) => {
        if (user) {
          return of(user);
        }
        return this.googleUserService.createNewGoogleUser(googleUser);
      }),
    );
  }
}
