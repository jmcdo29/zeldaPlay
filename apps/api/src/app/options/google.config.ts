import { Injectable } from '@nestjs/common';
import { ModuleConfigFactory } from '@golevelup/nestjs-modules';
import { GoogleModuleOptions } from '../auth/google/google.interface';
import { ConfigService } from '../config/config.service';

@Injectable()
export class GoogleModuleConfig
  implements ModuleConfigFactory<GoogleModuleOptions> {
  constructor(private readonly config: ConfigService) {}

  createModuleConfig(): GoogleModuleOptions {
    return this.config.googleConfig;
  }
}
