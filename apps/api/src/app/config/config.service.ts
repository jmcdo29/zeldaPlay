import { validatedPlainToClass, ValidationError } from '@marcj/marshal';
import { Inject, Injectable } from '@nestjs/common';
import { LogLevel } from '@ogma/logger';
import { parse } from 'dotenv';
import { readFileSync } from 'fs';
import { join } from 'path';
import { GoogleModuleOptions } from '../auth/google/google.interface';
import { CONFIG_MODULE_OPTIONS } from './config.constants';
import { ConfigModuleOptions } from './interfaces/config-options.interface';
import { EnvConfig } from './model/env.model';

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
      config = parse(readFileSync(join(process.env.PWD, options.fileName)));
    } else {
      config = process.env;
    }
    this.envConfig = this.validateConfig(config);
  }

  private validateConfig(config: Record<string, any>): EnvConfig {
    try {
      return validatedPlainToClass(EnvConfig, config);
    } catch (err) {
      throw new Error(
        err.errors.map((err: ValidationError) => JSON.stringify(err)).join(' '),
      );
    }
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

  get redisUrl(): string {
    return this.envConfig.REDIS_URL;
  }

  get sessionSecret(): string {
    return this.envConfig.SESSION_SECRET;
  }

  get jwtSecret(): string {
    return this.envConfig.JWT_SECRET;
  }

  get globalPrefix(): string {
    return this.envConfig.GLOBAL_PREFIX;
  }

  get port(): number {
    return this.envConfig.PORT;
  }

  get logLevel(): keyof typeof LogLevel {
    return LogLevel[this.envConfig.LOG_LEVEL] as keyof typeof LogLevel;
  }

  get googleConfig(): GoogleModuleOptions {
    return {
      clientId: this.envConfig.GOOGLE_CLIENT,
      clientSecret: this.envConfig.GOOGLE_SECRET,
      callbackUrl: this.envConfig.GOOGLE_CALLBACK_URL,
      prompt: this.envConfig.GOOGLE_PROMPT,
      responseType: this.envConfig.GOOGLE_RESPONSE_TYPE,
      scope: this.envConfig.GOOGLE_SCOPE.split(' '),
      state: this.envConfig.GOOGLE_STATE,
    };
  }

  get cookieAge(): number {
    return this.envConfig.COOKIE_AGE;
  }

  get applicationName(): string {
    return this.envConfig.APPLICATION;
  }
}
