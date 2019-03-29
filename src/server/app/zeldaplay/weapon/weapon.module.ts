import { Module } from '@nestjs/common';

import { SharedServerModule } from '@Shared/shared.module';
import { WeaponController } from '@Weapon/weapon.controller';
import { WeaponService } from '@Weapon/weapon.service';

@Module({
  imports: [SharedServerModule],
  controllers: [WeaponController],
  providers: [WeaponService]
})
export class WeaponServerModule {}
