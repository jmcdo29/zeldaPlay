import { IsString, Matches } from 'class-validator';

export class WeaponIdParam {
  @IsString()
  @Matches(/^00W\w{9}$/)
  wepaonId: string;
}
