import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@Auth/auth.module';
import { CharacterController } from '@Character/character.controller';
import { CharacterService } from '@Character/character.service';
import { Character } from '@Entity/character.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Character]),
    AuthModule
  ],
  controllers: [CharacterController],
  providers: [CharacterService]
})
export class CharacterModule {}
