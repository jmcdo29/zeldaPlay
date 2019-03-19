import { IsIn } from 'class-validator';

export class DocParam {
  @IsIn(['client', 'server'])
  clientOrServer: string;
}
