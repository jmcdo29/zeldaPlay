import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EnumToArrayPipe } from './helpers/enum-to-array.pipe';
import { MessageService } from './messages/message.service';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  imports: [CommonModule, FormsModule, HttpClientModule],
  declarations: [MessagesComponent, EnumToArrayPipe],
  exports: [MessagesComponent, CommonModule, EnumToArrayPipe, FormsModule],
  providers: [MessageService]
})
export class SharedModule {}
