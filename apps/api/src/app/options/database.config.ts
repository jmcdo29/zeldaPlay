import { ConfigService } from '../config/config.service';
import {
  DatabaseModuleOptions,
  DatabaseOptionsFactory,
} from '../database/interfaces/database-options.interface';

export class DatabaseModuleConfig implements DatabaseOptionsFactory {
  constructor(private readonly configService: ConfigService) {
    console.log('Constructing DatabaseModuleConfig');
  }

  createDatabaseOptions(): DatabaseModuleOptions {
    return {
      connectionUrl: this.configService.get('DATABASE_URL'),
      ssl: this.configService.isProd(),
    };
  }
}
