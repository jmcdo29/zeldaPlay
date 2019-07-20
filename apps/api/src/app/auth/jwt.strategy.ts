import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { map } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { AuthService } from './auth.service';
import { JwtPayload } from './models/jwtPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  validate(payload: JwtPayload) {
    return this.authService.validateUser(payload).pipe(
      map((user) => {
        if (!user) {
          throw new UnauthorizedException();
        }
        return user;
      })
    );
  }
}
