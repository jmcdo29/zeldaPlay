import { Injectable } from '@nestjs/common';
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
      id: user.id
    });
    return {
      expiresIn: process.env.EXPIRE_TOKEN,
      accessToken,
      id: user.id
    };
  }

  async signup(newUser: NewUserDTO): Promise<JwtReturnDTO> {
    const user = await this.userService.signup(newUser);
    const accessToken = this.jwtService.sign({
      email: user.email,
      id: user.id
    });
    return {
      expiresIn: process.env.EXPIRE_TOKEN,
      accessToken,
      id: user.id
    };
  }

  async validateUser(payload: JwtDTO): Promise<User> {
    return this.userService.findUserByEmail(payload.email);
  }
}
