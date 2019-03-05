import { IsId } from '@Decorators/index';

export class UserIdParam {
  @IsId('00U', { message: 'Invalid player id.' })
  userId: string;
}
