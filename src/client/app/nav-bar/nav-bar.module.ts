import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '#Shared/shared.module';

import { NavBarComponent } from './nav-bar.component';

@NgModule({
  declarations: [NavBarComponent],
  imports: [SharedModule, RouterModule.forRoot([])],
  exports: [NavBarComponent, RouterModule]
})
export class NavBarModule {}
