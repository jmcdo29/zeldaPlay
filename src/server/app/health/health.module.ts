import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { ZeldaplayModule } from '../zeldaplay/zeldaplay.module';
import { TerminusOptionsService } from './terminus-option.service';

@Module({
  imports: [
    TerminusModule.forRootAsync({
      imports: [ZeldaplayModule],
      useClass: TerminusOptionsService
    })
  ]
})
export class HealthModule {}
