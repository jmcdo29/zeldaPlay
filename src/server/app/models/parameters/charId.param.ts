import { Matches } from 'class-validator';

export class CharacterIdParam {
  @Matches(/^00C\w{9}$/)
  charId: string;
}
