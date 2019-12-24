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
      config = parse(readFileSync(join(process.env.PWD, options.fileName)));
    } else {
      config = process.env;
    }
    this.envConfig = this.validateConfig(config);
  }

  private validateConfig(config: Record<string, any>): EnvRunType {
    config = { ...defaults, ...config };
    return EnvRunType.check(config);
  }

  get databaseUrl(): string {
    return this.envConfig.DATABASE_URL;
  }

  get isProd(): boolean {
    const env = this.nodeEnv.toLowerCase();
    return env === 'production' || env === 'prod';
  }

  get nodeEnv(): string {
    return this.envConfig.NODE_ENV;
  }

  get rateLimit(): number {
    return Number.parseInt(this.envConfig.RATE_LIMIT, 10);
  }

  get redisUrl(): string {
    return this.envConfig.REDIS_URL;
  }

  get sessionSecret(): string {
    return this.envConfig.SESSION_SECRET;
  }

  get jwtSecret(): string {
    return this.envConfig.JWT_SECRET;
  }

  get jwtExpiresIn(): string {
    return this.envConfig.JWT_EXPIRES;
  }

  get globalPrefix(): string {
    return this.envConfig.GLOBAL_PREFIX;
  }

  get port(): number {
    return Number.parseInt(this.envConfig.PORT, 10);
  }

  get logLevel() {
    return this.envConfig.LOG_LEVEL;
  }

  get googleClient(): string {
    return this.envConfig.GOOGLE_CLIENT;
  }

  get googleSecret(): string {
    return this.envConfig.GOOGLE_SECRET;
  }

  get googleCallback(): string {
    return this.envConfig.GOOGLE_CALLBACK_URL;
  }

  get morganString(): string {
    this.envConfig.MORGAN_STRING = this.envConfig.MORGAN_STRING
      ? this.envConfig.MORGAN_STRING
      : this.isProd
      ? 'combined'
      : 'dev';
    return this.envConfig.MORGAN_STRING;
  }

  get cookieAge(): number {
    return Number.parseInt(this.envConfig.COOKIE_AGE, 10) * 1000;
  }

  get applicationName(): string {
    return this.envConfig.APPLICATION;
  }
}
