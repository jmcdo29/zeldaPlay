import {
  ConflictException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcryptjs';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';

import { NewUserDTO } from '../auth/interfaces/new_user.dto';
import { UserDTO } from '../auth/interfaces/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>
  ) {}

  async login(user: UserDTO): Promise<User> {
    const dbUser = await this.userRepo.findOneOrFail({ email: user.email });
    if (await compare(user.password, dbUser.password)) {
      return dbUser;
    } else {
      throw new UnauthorizedException('Invalid email or password.');
    }
  }

  async signup(user: NewUserDTO): Promise<User> {
    const existingUser = await this.userRepo.find({ email: user.email });
    if (existingUser.length > 0) {
      return Promise.reject(
        new ConflictException(
          'That email already exists. Please log in or choose another email.'
        )
      );
    }
    const newUser = this.userRepo.create(user);
    newUser.password = await hash(newUser.password, 12);
    return this.userRepo.save(newUser);
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userRepo.findOneOrFail({ email });
  }

  async findUserByToken(token: string): Promise<User> {
    return this.userRepo.findOneOrFail({ loginToken: token });
  }

  /* async findUserByGToken(gToken: string): Promise<User> {
    return this.userRepo.findOneOrFail({googleToken: gToken});
  } */
}
