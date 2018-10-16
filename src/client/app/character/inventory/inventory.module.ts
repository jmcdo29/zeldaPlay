import { SharedModule } from '#Shared/shared.module';
import { NgModule } from '@angular/core';

import { InventoryComponent } from './inventory.component';

@NgModule({
  imports: [SharedModule],
  declarations: [InventoryComponent],
  exports: [InventoryComponent]
})
export class InventoryModule {}
