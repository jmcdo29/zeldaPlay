import { Module } from '@nestjs/common';

import { CharacterController } from '@Character/character.controller';
import { CharacterHealthIndicator } from '@Character/character.health';
import { CharacterService } from '@Character/character.service';
import { SharedServerModule } from '@Shared/shared.module';

@Module({
  imports: [SharedServerModule],
  controllers: [CharacterController],
  providers: [CharacterService, CharacterHealthIndicator],
  exports: [CharacterHealthIndicator]
})
export class CharacterServerModule {}
