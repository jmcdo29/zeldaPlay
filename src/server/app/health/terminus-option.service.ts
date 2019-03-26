import { Injectable } from '@nestjs/common';
import {
  TerminusEndpoint,
  TerminusModuleOptions,
  TerminusOptionsFactory
} from '@nestjs/terminus';

import { CharacterHealthIndicator } from '@Character/character.health';

@Injectable()
export class TerminusOptionsService implements TerminusOptionsFactory {
  constructor(private readonly charHealth: CharacterHealthIndicator) {}

  createTerminusOptions(): TerminusModuleOptions {
    const healthEndpoint: TerminusEndpoint = {
      url: '/health/character',
      healthIndicators: [
        async () => this.charHealth.isHealthy('character').toPromise()
      ]
    };
    return {
      endpoints: [healthEndpoint]
    };
  }
}
