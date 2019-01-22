import { Module } from '@nestjs/common';

import { CharacterController } from '@Character/character.controller';
import { CharacterService } from '@Character/character.service';
import { SharedModule } from '@Shared/shared.module';
import { DbCharacterService } from './db-character/db-character.service';

@Module({
  imports: [SharedModule],
  controllers: [CharacterController],
  providers: [CharacterService, DbCharacterService]
})
export class CharacterModule {}
