import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtDTO } from '@Auth/interfaces/jwt.dto';
import { JwtReturnDTO } from '@Auth/interfaces/jwtReturn.dto';
import { NewUserDTO } from '@Auth/interfaces/new_user.dto';
import { UserDTO } from '@Auth/interfaces/user.dto';
import { User } from '@Entity/user.entity';
import { UserService } from '@User/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async login(payload: UserDTO): Promise<JwtReturnDTO> {
    const user = await this.userService.login(payload);
    const accessToken = this.jwtService.sign({
      email: user.email,
      id: user.id,
      provider: 'local'
    });
    return {
      accessToken,
      id: user.id
    };
  }

  async signup(newUser: NewUserDTO): Promise<JwtReturnDTO> {
    const user = await this.userService.signup(newUser);
    const accessToken = this.jwtService.sign({
      email: user.email,
      id: user.id,
      provider: 'local'
    });
    return {
      accessToken,
      id: user.id
    };
  }

  async validateUser(payload: JwtDTO): Promise<User> {
    switch (payload.provider) {
      case 'local':
        return this.userService.findUserByEmail(payload.email);
      /* case 'google':
        return this.userService.findUserByGoogleToken(payload.email); */
      default:
        throw new UnauthorizedException('Login invalid. Please log in again.');
    }
  }

  /* async googleToken(): Promise<string> {
    const scopes = [
      'https://www.googleapis.com/auth/plus.me',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile'
    ];

    const url = this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes
    });
    console.log(url);
    return url;
  }

  async getGoogleUser(code: GetTokenOptions): Promise<any> {
    const {tokens} = await this.oauth2Client.getToken(code);
    this.oauth2Client.setCredentials(tokens);
    try {
      const plus = google.plus({
        version: 'v1',
        auth: this.oauth2Client
      });
      const {data} = await plus.people.get({
        userId: 'me',
      });
      console.log(data);
      return this.googleLogin(tokens.access_token, data.emails[0].value);
    } catch (err) {
      console.error(err.message);
      throw new BadRequestException('Whoops! There was a problem logging in!');
    }
  }

  async googleLogin(token: string, email: string): Promise<User> {
    return this.userService.googleSignup({email, token});
  } */
}
