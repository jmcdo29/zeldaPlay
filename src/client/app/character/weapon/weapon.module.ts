import { SharedModule } from '#Shared/shared.module';
import { NgModule } from '@angular/core';

import { WeaponComponent } from './weapon.component';
import { WeaponService } from './weapon.service';

@NgModule({
  imports: [SharedModule],
  declarations: [WeaponComponent],
  providers: [WeaponService],
  exports: [WeaponComponent]
})
export class WeaponModule {}
