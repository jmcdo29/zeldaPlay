import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';

import { Weapon } from 'entities/weapon.entity';

import { WeaponPipe } from './weapon.pipe';
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

  @Post('/new/:charId')
  @ApiOperation({
    title: 'New Weapon',
    description: 'Create a new weapon for the character.'
  })
  @UsePipes(WeaponPipe)
  async newWeapon(
    @Body() inWeapon: Weapon,
    @Param('charId') charId: string
  ): Promise<Weapon> {
    return this.weaponService.newWeapon(inWeapon, charId);
  }

  @Post('/update/:weaponId')
  @ApiOperation({
    title: 'Update Weapon',
    description: 'Update the weapon saved in the database with the specified id'
  })
  @UsePipes(WeaponPipe)
  async updateWeapon(@Body() inWeapon: Weapon): Promise<Weapon> {
    return this.weaponService.updateWeapon(inWeapon);
  }
}
