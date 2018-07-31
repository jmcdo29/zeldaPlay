import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EnumModule } from '../helpers/customPipes';
import { MessagesComponent } from '../messages/messages.component';
import { MessageService } from '../messages/message.service';
import { HttpClientModule } from '../../../node_modules/@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    EnumModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [MessagesComponent],
  exports: [MessagesComponent, CommonModule, EnumModule, FormsModule],
  providers: [MessageService]
})
export class SharedModule { }
