import { Module } from '@nestjs/common';

import { CharacterController } from '@Character/character.controller';
import { CharacterService } from '@Character/character.service';
import { SharedServerModule } from '@Shared/shared.module';
import { DbCharacterService } from './db-character/db-character.service';

@Module({
  imports: [SharedServerModule],
  controllers: [CharacterController],
  providers: [CharacterService, DbCharacterService]
})
export class CharacterServerModule {}
