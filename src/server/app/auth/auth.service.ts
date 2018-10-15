import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../entities/user.entity';
import { UserService } from '../user/user.service';
import { JwtDTO } from './interfaces/jwt.dto';
import { NewUserDTO } from './interfaces/new_user.dto';
import { UserDTO } from './interfaces/user.dto';

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
