import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryDataService } from './in-memory-data.service';

import { SharedModule } from './CustomPipes/customPipes';

import { AppComponent } from './app.component';
import { CharactersComponent } from './characters/characters.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { DieComponent } from './die/die.component';
import { CharacterCreateComponent } from './character-create/character-create.component';
import { CharacterLevelUpComponent } from './character-level-up/character-level-up.component';
import { CharacterService } from './character.service';
import { CharacterSkillsComponent } from './character-skills/character-skills.component';
import { CharacterWeaponComponent } from './character-weapon/character-weapon.component';
import { CharacterSpellComponent } from './character-spell/character-spell.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';

@NgModule({
  declarations: [
    AppComponent,
    CharactersComponent,
    CharacterDetailComponent,
    DieComponent,
    CharacterCreateComponent,
    CharacterLevelUpComponent,
    CharacterSkillsComponent,
    CharacterWeaponComponent,
    CharacterSpellComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {passThruUnknownUrl: true, dataEncapsulation: false}
    )
  ],
  providers: [CharacterService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
