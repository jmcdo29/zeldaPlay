import { SharedModule } from '#Shared/shared.module';
import { NgModule } from '@angular/core';

import { NoteComponent } from './note.component';
import { NoteService } from './note.service';

@NgModule({
  imports: [SharedModule],
  declarations: [NoteComponent],
  providers: [NoteService],
  exports: [NoteComponent]
})
export class NoteModule {}
