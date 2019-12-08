import { Injectable } from '@nestjs/common';
import { AuthOptionsFactory, IAuthModuleOptions } from '@nestjs/passport';

@Injectable()
export class PassportModuleConfig implements AuthOptionsFactory {
  createAuthOptions(): IAuthModuleOptions {
    return {
      defaultStrategy: 'google',
      authType: 'reauthenticate',
      prompt: 'select_account',
      session: true,
    };
  }
}
