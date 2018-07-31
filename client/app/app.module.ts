import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from './_helpers/customPipes';

import { AppComponent } from './app.component';
import { CharactersComponent } from './characters/characters.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { DieComponent } from './die/die.component';
import { CharacterCreateComponent } from './character-create/character-create.component';
import { CharacterLevelUpComponent } from './character-level-up/character-level-up.component';
import { CharacterService } from './_services/character.service';
import { CharacterSkillsComponent } from './character-skills/character-skills.component';
import { CharacterWeaponComponent } from './character-weapon/character-weapon.component';
import { CharacterSpellComponent } from './character-spell/character-spell.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './_services/message.service';
import { CharacterNotesComponent } from './character-notes/character-notes.component';
import { CharacterInventoryComponent } from './character-inventory/character-inventory.component';
import { CharacterSavesComponent } from './character-saves/character-saves.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { routing } from './app.routing';
import { AlertComponent } from './_directives/alert.component';
import { AlertService } from './_services/alert.service';

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
    MessagesComponent,
    CharacterNotesComponent,
    CharacterInventoryComponent,
    CharacterSavesComponent,
    UserLoginComponent,
    UserRegisterComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    HttpClientModule,
    routing
  ],
  providers: [CharacterService, MessageService, AlertService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
