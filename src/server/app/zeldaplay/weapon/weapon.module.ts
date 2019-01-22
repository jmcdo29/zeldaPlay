import { Module } from '@nestjs/common';

import { SharedModule } from '@Shared/shared.module';
import { WeaponController } from '@Weapon/weapon.controller';
import { WeaponService } from '@Weapon/weapon.service';
import { DbWeaponService } from './db-weapon/db-weapon.service';

@Module({
  imports: [SharedModule],
  controllers: [WeaponController],
  providers: [WeaponService, DbWeaponService]
})
export class WeaponModule {}
