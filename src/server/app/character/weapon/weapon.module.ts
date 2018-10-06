import { Module } from '@nestjs/common';
import { WeaponController } from './weapon.controller';
import { WeaponService } from './weapon.service';

@Module({
  controllers: [WeaponController],
  providers: [WeaponService]
})
export class WeaponModule {}
