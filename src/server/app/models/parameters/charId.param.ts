import { IsId } from '@Decorators/index';

export class CharacterIdParam {
  @IsId('00C', { message: 'Invalid character id.' })
  charId: string;
}
