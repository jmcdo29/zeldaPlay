import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { WeaponDTO } from './interfaces/weapon.dto';
import { WeaponService } from './weapon.service';

@Controller('weapon')
export class WeaponController {
  constructor(private readonly weaponService: WeaponService) {}

  @Get(':charId')
  async getWeapons(@Param('charId') charId: string) {
    return this.weaponService.getWeapons(charId);
  }

  @Post(':charId')
  async newWeapon(
    @Body() inWeapon: WeaponDTO,
    @Param('charId') charId: string
  ) {
    return this.weaponService.newWeapon(inWeapon, charId);
  }
}
