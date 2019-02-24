import { Matches } from 'class-validator';

export class UserIdParam {
  @Matches(/^00U\w{9}$/)
  userId: string;
}
