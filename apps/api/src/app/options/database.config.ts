import { ModuleConfigFactory } from '@levelup-nestjs/modules';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { DatabaseModuleOptions } from '../database/interfaces/database-options.interface';

@Injectable()
export class DatabaseModuleConfig
  implements ModuleConfigFactory<DatabaseModuleOptions> {
  constructor(private readonly configService: ConfigService) {}

  createModuleConfig(): DatabaseModuleOptions {
    return {
      connectionUrl: this.configService.getDatabaseUrl(),
      ssl: this.configService.isProd(),
    };
  }
}
