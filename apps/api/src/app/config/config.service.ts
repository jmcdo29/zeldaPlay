import { Inject, Injectable } from '@nestjs/common';
import { parse } from 'dotenv';
import { readFileSync } from 'fs';
import { join } from 'path';
import { CONFIG_MODULE_OPTIONS } from './config.constants';
import { ConfigModuleOptions } from './interfaces/config-options.interface';
import { defaults, EnvRunType } from './model/env.model';

@Injectable()
export class ConfigService {
  private envConfig: EnvRunType;

  constructor(
    @Inject(CONFIG_MODULE_OPTIONS)
    options: ConfigModuleOptions,
  ) {
    if (!options.useProcess && !options.fileName) {
      throw new Error(
        'Missing configuration options.' +
          ' If using process.env variables, please mark useProcess as "true".' +
          ' Otherwise, please provide and env file.',
      );
    }
    let config: { [key: string]: any };
    if (options.fileName) {
      config = parse(
        readFileSync(join(process.env.PWD as string, options.fileName)),
      );
    } else {
      config = process.env;
    }
    this.envConfig = this.validateConfig(config);
  }

  private validateConfig(config: Record<string, any>): EnvRunType {
    config = { ...defaults, ...config };
    return EnvRunType.check(config);
  }

  getDatabaseUrl(): string {
    return this.envConfig.DATABASE_URL;
  }

  isProd(): boolean {
    const env = this.getNodeEnv().toLowerCase();
    return env === 'production' || env === 'prod';
  }

  getNodeEnv(): string {
    return this.envConfig.NODE_ENV;
  }

  getRateLimit(): number {
    return Number.parseInt(this.envConfig.RATE_LIMIT, 10);
  }

  getRedisUrl(): string {
    return this.envConfig.REDIS_URL;
  }

  getSessionSecret(): string {
    return this.envConfig.SESSION_SECRET;
  }

  getJwtSecret(): string {
    return this.envConfig.JWT_SECRET;
  }

  getJwtExpiresIn(): string {
    return this.envConfig.JWT_EXPIRES;
  }

  getGlobalPrefix(): string {
    return this.envConfig.GLOBAL_PREFIX;
  }

  getPort(): number {
    return typeof this.envConfig.PORT === 'number'
      ? this.envConfig.PORT
      : Number.parseInt(this.envConfig.PORT, 10);
  }

  getLogLevel() {
    return this.envConfig.LOG_LEVEL;
  }

  getGoogleClient(): string {
    return this.envConfig.GOOGLE_CLIENT;
  }

  getGoogleSecret(): string {
    return this.envConfig.GOOGLE_SECRET;
  }

  getGoogleCallback(): string {
    return this.envConfig.GOOGLE_CALLBACK_URL;
  }
}
