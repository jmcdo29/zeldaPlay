import { IsId } from '@Decorators/index';
import { IsString } from 'class-validator';

export class SpellIdParam {
  @IsString()
  @IsId('0Sp', { message: 'Invalid spell id.' })
  spellId: string;
}
