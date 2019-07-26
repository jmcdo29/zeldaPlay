import { Injectable } from '@nestjs/common';
import {
  ConfigModuleOptions,
  ConfigOptionsFactory,
} from '../config/interfaces/config-options.interface';

@Injectable()
export class ConfigModuleConfig implements ConfigOptionsFactory {
  constructor() {}

  createConfigOptions(): ConfigModuleOptions {
    return {
      fileName: '.env',
      useProcess: false,
    };
  }
}
