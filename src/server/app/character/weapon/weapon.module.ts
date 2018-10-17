import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Weapon } from '@Entity/weapon.entity';

import { WeaponController } from '@Character/weapon/weapon.controller';
import { WeaponService } from '@Character/weapon/weapon.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Weapon])
  ],
  controllers: [WeaponController],
  providers: [WeaponService]
})
export class WeaponModule {}
