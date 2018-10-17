import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '#Shared/shared.module';
import { CharacterCreateComponent } from './character-create/character-create.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { CharacterLevelUpComponent } from './character-level-up/character-level-up.component';
import { CharactersComponent } from './characters.component';
import { DieModule } from './die/die.module';
import { InventoryModule } from './inventory/inventory.module';
import { NoteModule } from './note/note.module';
import { SaveModule } from './save/save.module';
import { SkillModule } from './skill/skill.module';
import { SpellModule } from './spell/spell.module';
import { WeaponModule } from './weapon/weapon.module';

const characterRoutes: Routes = [{ path: '', component: CharactersComponent }];

@NgModule({
  imports: [
    RouterModule.forRoot(characterRoutes),
    DieModule,
    InventoryModule,
    NoteModule,
    SaveModule,
    SharedModule,
    SkillModule,
    SpellModule,
    WeaponModule
  ],
  declarations: [
    CharactersComponent,
    CharacterCreateComponent,
    CharacterDetailComponent,
    CharacterLevelUpComponent
  ],
  exports: [RouterModule]
})
export class CharacterModule {}
