import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CapitalizePipe } from '#Shared/helpers/capitalize.pipe';
import { EnumToArrayPipe } from '#Shared/helpers/enum-to-array.pipe';
import { MessageService } from '#Shared/messages/message.service';
import { MessagesComponent } from '#Shared/messages/messages.component';
import { AbstractService } from './abstract.service';
import { MaterialModule } from './material/material.module';
import { NavBarService } from './nav-bar.service';

@NgModule({
  imports: [CommonModule, FormsModule, HttpClientModule, MaterialModule],
  declarations: [MessagesComponent, EnumToArrayPipe, CapitalizePipe],
  exports: [
    MessagesComponent,
    CommonModule,
    EnumToArrayPipe,
    FormsModule,
    MaterialModule,
    CapitalizePipe
  ],
  providers: [MessageService, AbstractService, NavBarService]
})
export class SharedModule {}
