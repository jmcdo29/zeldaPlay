import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Weapon } from '@Entity/weapon.entity';

import { AuthModule } from '@Auth/auth.module';
import { WeaponController } from '@Weapon/weapon.controller';
import { WeaponService } from '@Weapon/weapon.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Weapon]), AuthModule],
  controllers: [WeaponController],
  providers: [WeaponService]
})
export class WeaponModule {}
