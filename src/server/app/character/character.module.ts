import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Character } from '@Entity/character.entity';
import { NoteModule } from '@Note/note.module';
import { SkillModule } from '@Skill/skill.module';
import { SpellModule } from '@Spell/spell.module';
import { WeaponModule } from '@Weapon/weapon.module';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';

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
