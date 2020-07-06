import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { compare } from 'bcrypt';
import { Observable, of } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { ReqWithCookies } from '../../interfaces/req-with-cookies.interface';
import { GoogleService } from '../google/google.service';
import { GoogleUser } from '../user/models/google-user.model';
import { UserService } from '../user/user.service';
import { AuthDTO, GoogleSub, LoginDTO, SignupDTO } from './models';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly googleService: GoogleService,
  ) {}

  login(login: LoginDTO): Observable<AuthDTO> {
    return this.userService.getByEmail(login.email).pipe(
      mergeMap(async (user) => {
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

  findOrCreateGoogleUser(googleUser: {
    user: GoogleSub;
    req: ReqWithCookies;
  }): Observable<GoogleUser> {
    const { req } = googleUser;
    console.log(googleUser.user);
    return this.googleService.getByGoogleId(googleUser.user.id).pipe(
      switchMap((user) => {
        if (user) {
          return of(user);
        }
        return this.googleService.createNewGoogleUser(googleUser.user);
      }),
      /* tap((user) => {
        this.setCookie(req, user);
      }), */
    );
  }

  private setCookie(req: ReqWithCookies, user: GoogleUser): void {
    console.log('Setting _cookie on req');
    req._cookies?.length
      ? req._cookies.push({
          name: 'user_cookie',
          val: user.id,
        })
      : (req._cookies = [
          {
            name: 'user_cookie',
            val: user.id,
          },
        ]);
    console.log(`req._cookies: ${JSON.stringify(req._cookies)}`);
  }
}
