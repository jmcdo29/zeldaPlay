import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EnumToArrayPipe } from '#Shared/helpers/enum-to-array.pipe';
import { MessageService } from '#Shared/messages/message.service';
import { MessagesComponent } from '#Shared/messages/messages.component';
import { MaterialModule } from './material/material.module';

@NgModule({
  imports: [CommonModule, FormsModule, HttpClientModule, MaterialModule],
  declarations: [MessagesComponent, EnumToArrayPipe],
  exports: [
    MessagesComponent,
    CommonModule,
    EnumToArrayPipe,
    FormsModule,
    MaterialModule
  ],
  providers: [MessageService]
})
export class SharedModule {}
