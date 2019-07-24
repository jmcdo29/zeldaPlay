import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { GraphQLModule } from './graphql.module';
import { MessageModule } from './message/message.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    GraphQLModule,
    MessageModule,
    ReactiveFormsModule,
  ],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule {}
