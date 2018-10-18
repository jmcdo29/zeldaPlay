import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@Auth/auth.module';
import { CharacterController } from '@Character/character.controller';
import { CharacterService } from '@Character/character.service';
import { NoteModule } from '@Character/note/note.module';
import { SkillModule } from '@Character/skill/skill.module';
import { SpellModule } from '@Character/spell/spell.module';
import { WeaponModule } from '@Character/weapon/weapon.module';
import { Character } from '@Entity/character.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Character]),
    SkillModule,
    WeaponModule,
    SpellModule,
    NoteModule
  ],
  controllers: [CharacterController],
  providers: [CharacterService]
})
export class CharacterModule {}
