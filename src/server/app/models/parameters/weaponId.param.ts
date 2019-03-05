import { IsId } from '@Decorators/index';
import { IsString } from 'class-validator';

export class WeaponIdParam {
  @IsString()
  @IsId('00W', { message: 'Invalid weapon id' })
  wepaonId: string;
}
