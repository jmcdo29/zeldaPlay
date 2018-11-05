import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AlertComponent } from '#Alert/alert.component';
import { AlertService } from '#Alert/alert.service';
import { MaterialModule } from '#Shared/material/material.module';
import { AppComponent } from './app.component';
import { CharacterModule } from './character/character.module';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [AppComponent, AlertComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CharacterModule,
    UserModule,
    MaterialModule
  ],
  bootstrap: [AppComponent],
  providers: [AlertService]
})
export class AppModule {}
