import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Weapon } from '@Entity/weapon.entity';
import { SharedModule } from '@Shared/shared.module';
import { WeaponController } from '@Weapon/weapon.controller';
import { WeaponService } from '@Weapon/weapon.service';
import { DbWeaponService } from './db-weapon/db-weapon.service';



@Module({
  imports: [
    TypeOrmModule.forFeature([Weapon]), SharedModule],
  controllers: [WeaponController],
  providers: [WeaponService, DbWeaponService]
})
export class WeaponModule {}
