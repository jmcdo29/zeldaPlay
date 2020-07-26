import { ModuleConfigFactory } from '@golevelup/nestjs-modules';
import { Injectable } from '@nestjs/common';
import { ClientOpts } from 'redis';
import { ConfigService } from '../config/config.service';

@Injectable()
export class RedisModuleConfig implements ModuleConfigFactory<ClientOpts> {
  constructor(private readonly config: ConfigService) {}

  createModuleConfig(): ClientOpts {
    return this.config.redisConfig;
  }
}
