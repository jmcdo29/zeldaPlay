import { SharedModule } from '#Shared/shared.module';
import { NgModule } from '@angular/core';

import { SpellComponent } from './spell.component';
import { SpellService } from './spell.service';

@NgModule({
  imports: [SharedModule],
  declarations: [SpellComponent],
  providers: [SpellService],
  exports: [SpellComponent]
})
export class SpellModule {}
