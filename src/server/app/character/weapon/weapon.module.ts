import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Weapon } from '../../entities/weapon.entity';

import { WeaponController } from './weapon.controller';
import { WeaponService } from './weapon.service';

@Module({
  imports: [TypeOrmModule.forFeature([Weapon])],
  controllers: [WeaponController],
  providers: [WeaponService]
})
export class WeaponModule {}
