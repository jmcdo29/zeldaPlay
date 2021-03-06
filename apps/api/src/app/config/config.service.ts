import { jsonSerializer } from '@deepkit/type';
import { Inject, Injectable } from '@nestjs/common';
import { LogLevel } from '@ogma/logger';
import { parse } from 'dotenv';
import { readFileSync } from 'fs';
import { join } from 'path';
import { ClientOpts } from 'redis';
import { GoogleModuleOptions } from '../auth/google/google.interface';
import { DatabaseModuleOptions } from '../database/interfaces/database-options.interface';
import { CONFIG_MODULE_OPTIONS } from './config.constants';
import { ConfigModuleOptions } from './interfaces/config-options.interface';
import { EnvConfig } from './model/env.model';
import { OgmaModuleOptions } from '@ogma/nestjs-module';

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
    if (options.fileName && !options.useProcess) {
      config = parse(readFileSync(join(process.env.PWD, options.fileName)));
    } else {
      config = process.env;
    }
    this.envConfig = this.validateConfig(config);
  }

  private validateConfig(config: Record<string, any>): EnvConfig {
    try {
      return jsonSerializer.for(EnvConfig).validatedDeserialize(config);
    } catch (err) {
      throw new Error(
        err.errors.map((err: Error) => JSON.stringify(err)).join(' '),
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

  get databaseConfig(): DatabaseModuleOptions {
    return {
      connectionUrl: this.databaseUrl,
      ssl: this.isProd,
    };
  }

  get nodeEnv(): string {
    return this.envConfig.NODE_ENV;
  }

  get redisUrl(): string {
    return this.envConfig.REDIS_URL;
  }

  get redisConfig(): ClientOpts {
    return {
      url: this.redisUrl,
    };
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

  get applicationName(): string {
    return this.envConfig.APPLICATION;
  }

  get ogmaConfig(): Pick<OgmaModuleOptions, 'service'> {
    return {
      service: {
        logLevel: this.logLevel,
        json: this.isProd,
        color: !this.isProd,
        application: this.applicationName,
      },
    };
  }
}
