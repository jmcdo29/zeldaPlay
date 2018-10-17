import { SharedModule } from '#Shared/shared.module';
import { NgModule } from '@angular/core';

import { SaveComponent } from './save.component';

@NgModule({
  imports: [SharedModule],
  declarations: [SaveComponent],
  exports: [SaveComponent]
})
export class SaveModule {}
