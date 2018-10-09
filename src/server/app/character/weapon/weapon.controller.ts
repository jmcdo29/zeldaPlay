import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';

import { WeaponDTO } from './interfaces/weapon.dto';
import { WeaponService } from './weapon.service';

@ApiUseTags('weapon')
@Controller('character/weapon')
export class WeaponController {
  constructor(private readonly weaponService: WeaponService) {}

  @Get(':charId')
  @ApiOperation({
    title: 'Get Weapons',
    description: 'Get all the weapons of the specified character.'
  })
  async getWeapons(@Param('charId') charId: string) {
    return this.weaponService.getWeapons(charId);
  }

  @Post(':charId')
  @ApiOperation({
    title: 'New Weapon',
    description: 'Create a new weapon for the character.'
  })
  async newWeapon(
    @Body() inWeapon: WeaponDTO,
    @Param('charId') charId: string
  ) {
    return this.weaponService.newWeapon(inWeapon, charId);
  }
}
