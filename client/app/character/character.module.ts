import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CharactersComponent } from './characters.component';
import { CharacterCreateComponent } from './character-create/character-create.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { CharacterInventoryComponent } from './character-inventory/character-inventory.component';
import { CharacterLevelUpComponent } from './character-level-up/character-level-up.component';
import { CharacterNotesComponent } from './character-notes/character-notes.component';
import { CharacterSavesComponent } from './character-saves/character-saves.component';
import { CharacterSkillsComponent } from './character-skills/character-skills.component';
import { CharacterSpellComponent } from './character-spell/character-spell.component';
import { CharacterWeaponComponent } from './character-weapon/character-weapon.component';
import { DieComponent } from './die/die.component';
import { SharedModule } from '../shared/shared.module';

const characterRoutes: Routes = [
  { path: '', component: CharactersComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(characterRoutes),
    SharedModule
  ],
  declarations: [
    CharactersComponent,
    CharacterCreateComponent,
    CharacterDetailComponent,
    CharacterInventoryComponent,
    CharacterLevelUpComponent,
    CharacterNotesComponent,
    CharacterSavesComponent,
    CharacterSkillsComponent,
    CharacterSpellComponent,
    CharacterWeaponComponent,
    DieComponent
  ],
  exports: [
    RouterModule
  ]
})
export class CharacterModule {}
