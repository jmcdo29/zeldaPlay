import { Module } from '@nestjs/common';

import { CharacterServerModule } from '@Character/character.module';
import { NoteServerModule } from '@Note/note.module';
import { SkillServerModule } from '@Skill/skill.module';
import { SpellServerModule } from '@Spell/spell.module';
import { WeaponServerModule } from '@Weapon/weapon.module';

@Module({
  imports: [
    CharacterServerModule,
    NoteServerModule,
    SkillServerModule,
    SpellServerModule,
    WeaponServerModule
  ]
})
export class ZeldaplayModule {}
