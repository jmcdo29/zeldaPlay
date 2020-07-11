import { Injectable } from '@nestjs/common';
import { ModuleConfigFactory } from '@golevelup/nestjs-modules';
import { GoogleModuleOptions } from '../auth/google/google.interface';
import { ConfigService } from '../config/config.service';

@Injectable()
export class GoogleModuleConfig
  implements ModuleConfigFactory<GoogleModuleOptions> {
  constructor(private readonly config: ConfigService) {}

  createModuleConfig(): GoogleModuleOptions {
    return {
      clientSecret: this.config.googleSecret,
      clientId: this.config.googleClient,
      state: 'some_state_token',
      scope: ['email', 'profile'],
      responseType: 'code',
      callbackUrl: this.config.googleCallback,
      prompt: 'select_account',
    };
  }
}
