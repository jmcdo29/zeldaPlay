import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { CharactersComponent } from './characters/characters.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { DieComponent } from './die/die.component';
import { CharacterCreateComponent } from './character-create/character-create.component';
import { CharacterLevelUpComponent } from './character-level-up/character-level-up.component';
import { CharacterService } from './character.service';


@NgModule({
  declarations: [
    AppComponent,
    CharactersComponent,
    CharacterDetailComponent,
    DieComponent,
    CharacterCreateComponent,
    CharacterLevelUpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [CharacterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
