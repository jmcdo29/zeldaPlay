import { IsString, Matches } from 'class-validator';

export class SpellIdParam {
  @IsString()
  @Matches(/^0Sp\w{9}$/)
  spellId: string;
}
