import {
  ConflictException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcryptjs';
import { Repository } from 'typeorm';

import { User } from '@Entity/user.entity';

import { NewUserDTO } from '@Auth/interfaces/new_user.dto';
import { UserDTO } from '@Auth/interfaces/user.dto';

const noUser = 'No user found for email ';

const registerFirst = '. Please register first.';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>
  ) {}

  async login(user: UserDTO): Promise<User> {
    const dbUser = await this.userRepo.findOne({ email: user.email });
    if (!dbUser) {
      throw new UnauthorizedException(noUser + user.email + registerFirst);
    } else if (await compare(user.password, dbUser.password)) {
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
    const user = await this.userRepo.findOne({ email });
    if (!user) {
      throw new UnauthorizedException(noUser + user.email + registerFirst);
    } else {
      return Promise.resolve(user);
    }
  }

  async findUserByToken(token: string): Promise<User> {
    const user = await this.userRepo.findOne({ loginToken: token });
    if (!user) {
      throw new UnauthorizedException(noUser + user.email + registerFirst);
    } else {
      return Promise.resolve(user);
    }
  }

  /* async googleSignup(user: GoogleUserDTO): Promise<User> {
    let returnUser: User;
    const existingUser = await this.userRepo.find({email: user.email});
    if (existingUser.length === 0) {
      returnUser = this.userRepo.create({
        email: user.email,
        googleToken: user.token
      });
      return this.userRepo.save(returnUser);
    } else {
      return existingUser[0];
    }
  } */

  /* async findUserByGoogleToken(token: string): Promise<User> {
    const user = await this.userRepo.findOne({ email: token });
    if (!user) {
      throw new UnauthorizedException(
        'No user found! Please connect your google account.'
      );
    } else {
      return Promise.resolve(user);
    }
  } */

  /* async findUserByGToken(gToken: string): Promise<User> {
    return this.userRepo.findOneOrFail({googleToken: gToken});
  } */
}
