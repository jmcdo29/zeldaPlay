import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from '../entities/character_schema';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import { NoteModule } from './note/note.module';
import { SaveModule } from './save/save.module';
import { SkillModule } from './skill/skill.module';
import { SpellModule } from './spell/spell.module';
import { WeaponModule } from './weapon/weapon.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Character]),
    SkillModule,
    WeaponModule,
    SpellModule,
    NoteModule,
    SaveModule
  ],
  controllers: [CharacterController],
  providers: [CharacterService]
})
export class CharacterModule {}
