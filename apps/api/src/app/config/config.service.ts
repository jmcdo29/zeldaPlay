import { Inject, Injectable } from '@nestjs/common';
import { parse } from 'dotenv';
import { readFileSync } from 'fs';
import { join } from 'path';
import { CONFIG_MODULE_OPTIONS } from './config.constants';
import { ConfigModuleOptions } from './interfaces/config-options.interface';
import { envVarSchema } from './model/env.model';

export interface EnvConfig {
  DATABASE_URL: string;
  REDIS_URL: string;
  SESSION_SECRET: string;
  JWT_SECRET: string;
  JWT_EXPIRES: string;
  RATE_LIMIT: string;
  PORT: string;
  GLOBAL_PREFIX: string;
  LOG_LEVEL: string;
  NODE_ENV: string;
}

@Injectable()
export class ConfigService {
  private envConfig: EnvConfig;

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

  private validateConfig(config: { [key: string]: any }): EnvConfig {
    const { error, value: validatedEnvConfig } = envVarSchema.validate(config, {
      allowUnknown: true,
    });
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig as EnvConfig;
  }

  /* get(key: string): string {
    return this.envConfig[key] || '';
  } */

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
    return Number.parseInt(this.envConfig.PORT, 10);
  }

  getLogLevel(): string {
    return this.envConfig.LOG_LEVEL;
  }
}
