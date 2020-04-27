import { Message } from '@tabletop-companion/api-interface';

export class MessageDTO implements Message {
  message!: string;
}
