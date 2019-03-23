import { Module } from '@nestjs/common';

import { CharacterController } from '@Character/character.controller';
import { CharacterHealthIndicator } from '@Character/character.health';
import { CharacterService } from '@Character/character.service';
import { SharedServerModule } from '@Shared/shared.module';
import { DbCharacterService } from './db-character/db-character.service';

@Module({
  imports: [SharedServerModule],
  controllers: [CharacterController],
  providers: [CharacterService, DbCharacterService, CharacterHealthIndicator],
  exports: [CharacterHealthIndicator]
})
export class CharacterServerModule {}
