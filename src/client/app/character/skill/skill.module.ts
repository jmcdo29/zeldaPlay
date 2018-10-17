import { SharedModule } from '#Shared/shared.module';
import { NgModule } from '@angular/core';

import { SkillComponent } from './skill.component';
import { SkillService } from './skill.service';

@NgModule({
  imports: [SharedModule],
  declarations: [SkillComponent],
  providers: [SkillService],
  exports: [SkillComponent]
})
export class SkillModule {}
