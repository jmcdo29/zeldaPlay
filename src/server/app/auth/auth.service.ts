import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtDTO } from '@Auth/interfaces/jwt.dto';
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

  async login(payload: UserDTO): Promise<string> {
    const user = await this.userService.login(payload);
    return this.jwtService.sign(user.email);
  }

  async signup(newUser: NewUserDTO): Promise<string> {
    const user = await this.userService.signup(newUser);
    return this.jwtService.sign(user.email);
  }

  async validateUser(payload: JwtDTO): Promise<User> {
    return this.userService.findUserByEmail(payload.email);
  }
}
