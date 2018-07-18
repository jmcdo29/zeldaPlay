import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryDataService } from './_services/in-memory-data.service';

import { SharedModule } from './_helpers/customPipes';

// attempting to add in chartist for Angular. Hopefully it goes well!
import { ChartistModule } from 'ng-chartist';

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
import { CharacterChartsComponent } from './character-charts/character-charts.component';

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
    CharacterChartsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // import for chartist
    ChartistModule,
    SharedModule,
    HttpClientModule/* ,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {passThruUnknownUrl: true, dataEncapsulation: false}
    ) */
  ],
  providers: [CharacterService, MessageService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
