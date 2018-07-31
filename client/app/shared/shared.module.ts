import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { EnumModule } from './helpers/customPipes';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './messages/message.service';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './alert/alert.service';


@NgModule({
  imports: [
    CommonModule,
    EnumModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [MessagesComponent, AlertComponent],
  exports: [MessagesComponent, CommonModule, EnumModule, FormsModule, AlertComponent],
  providers: [MessageService, AlertService]
})
export class SharedModule { }
