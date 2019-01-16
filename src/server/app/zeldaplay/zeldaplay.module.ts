import { Module } from '@nestjs/common';

import { CharacterModule } from '@Character/character.module';
import { NoteModule } from '@Note/note.module';
import { SkillModule } from '@Skill/skill.module';
import { SpellModule } from '@Spell/spell.module';
import { WeaponModule } from '@Weapon/weapon.module';

@Module({
  imports: [
    CharacterModule,
    NoteModule,
    SkillModule,
    SpellModule,
    WeaponModule
  ]
})
export class ZeldaplayModule {}
