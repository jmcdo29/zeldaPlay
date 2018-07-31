import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './alert/alert.service';
import { CharacterModule } from './character/character.module';
import { UserModule } from './user/user.module';



@NgModule({
  declarations: [
    AppComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // routing,
    CharacterModule,
    UserModule
  ],
  providers: [AlertService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
