import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { parse } from 'dotenv';
import { readFileSync } from 'fs';
import * as Joi from 'joi';
import { join } from 'path';
import { CONFIG_MODULE_OPTIONS } from './config.constants';
import { ConfigModuleOptions } from './interfaces/config-options.interface';
import { envVarSchema } from './model/env.model';

export interface EnvConfig {
  [key: string]: string;
}

@Injectable()
export class ConfigService implements OnModuleInit {
  private envConfig: EnvConfig;
  private prods: string[] = ['prod', 'production'];

  constructor(
    @Inject(CONFIG_MODULE_OPTIONS) private readonly options: ConfigModuleOptions
  ) {}

  onModuleInit() {
    if (!this.options.useProcess && !this.options.fileName) {
      throw new Error(
        'Missing configuration options.' +
          ' If using process.env variables, please mark useProcess as "true".' +
          ' Otherwise, please provide and env file.'
      );
    }
    let config: { [key: string]: any };
    if (this.options.fileName) {
      config = parse(
        readFileSync(join(process.env.PWD, this.options.fileName))
      );
    } else {
      config = process.env;
    }
    this.envConfig = this.validateConfig(config);
  }

  private validateConfig(config: EnvConfig): EnvConfig {
    const { error, value: validatedEnvConfig } = Joi.validate(
      config,
      envVarSchema,
      { allowUnknown: true }
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get(key: string): string {
    return this.envConfig[key] || '';
  }

  isProd(): boolean {
    const env = this.get('NODE_ENV').toLowerCase();
    return env === 'production' || env === 'prod';
  }

  getRateLimit(): number {
    return Number.parseInt(this.envConfig['RATE_LIMIT'], 10);
  }
}
