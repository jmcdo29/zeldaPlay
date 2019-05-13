import { Injectable } from '@nestjs/common';
import { parse } from 'dotenv';
import { readFileSync } from 'fs';
import * as Joi from 'joi';
import { join } from 'path';
import { envVarSchema } from './model/env.model';

export interface EnvConfig {
  [key: string]: string;
}

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;
  private prods: string[] = ['prod', 'production'];

  constructor() {
    if (!this.prods.includes(process.env.NODE_ENV.toLowerCase())) {
      const config = parse(
        readFileSync(join(__dirname, '..', '..', '..', '.env'))
      );
      this.envConfig = this.validateConfig(config);
    } else {
      this.envConfig = this.validateConfig(process.env);
    }
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
    return this.envConfig[key];
  }

  isProd(): boolean {
    const env = this.get('NODE_ENV').toLowerCase();
    return env === 'production' || env === 'prod';
  }
}
