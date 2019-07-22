import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MessageComponent } from './message.component';

@NgModule({
  declarations: [MessageComponent],
  imports: [CommonModule],
  exports: [MessageComponent],
})
export class MessageModule {}
