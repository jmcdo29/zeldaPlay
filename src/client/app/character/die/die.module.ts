import { SharedModule } from '#Shared/shared.module';
import { NgModule } from '@angular/core';

import { DieComponent } from './die.component';

@NgModule({
  imports: [SharedModule],
  declarations: [DieComponent],
  exports: [DieComponent]
})
export class DieModule {}
