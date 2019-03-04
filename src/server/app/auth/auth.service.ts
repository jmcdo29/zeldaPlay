import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtDTO, JwtReturnDTO, NewUserDTO, UserDTO } from '@Body/index';
import { DbPlayer } from '@DbModel/index';
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
      email: user.pEmail,
      id: user.pId,
      provider: 'local'
    });
    return {
      accessToken,
      id: user.pId
    };
  }

  async signup(newUser: NewUserDTO): Promise<JwtReturnDTO> {
    const user = await this.userService.signup(newUser);
    const accessToken = this.jwtService.sign({
      email: user.pEmail,
      id: user.pId,
      provider: 'local'
    });
    return {
      accessToken,
      id: user.pId
    };
  }

  async validateUser(payload: JwtDTO): Promise<DbPlayer> {
    // tslint:disable-next-line:no-small-switch
    switch (payload.provider) {
      case 'local':
        const users = await this.userService.findUserByEmail(payload.email);
        return users[0];
      default:
        throw new UnauthorizedException('Login invalid. Please log in again.');
    }
  }
}
