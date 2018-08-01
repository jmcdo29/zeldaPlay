import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CharacterModule } from './character/character.module';
import { UserModule } from './user/user.module';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './alert/alert.service';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CharacterModule,
    UserModule
  ],
  bootstrap: [AppComponent],
  providers: [AlertService]
})
export class AppModule { }
