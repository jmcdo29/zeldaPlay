import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiImplicitBody, ApiOperation, ApiUseTags } from '@nestjs/swagger';

import { Weapon } from '@Entity/weapon.entity';

import { WeaponDTO } from './interfaces/weapon.dto';
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

  @Post('new/:charId')
  @ApiOperation({
    title: 'New Weapon',
    description: 'Create a new weapon for the character.'
  })
  @UseGuards(AuthGuard())
  @ApiImplicitBody({ name: 'weapon', type: WeaponDTO })
  async newWeapon(
    @Body('weapon', WeaponPipe) inWeapon: Weapon,
    @Param('charId') charId: string
  ): Promise<Weapon> {
    return this.weaponService.newWeapon(inWeapon, charId);
  }

  @Post('update/:weaponId')
  @ApiOperation({
    title: 'Update Weapon',
    description: 'Update the weapon saved in the database with the specified id'
  })
  @UseGuards(AuthGuard())
  @ApiImplicitBody({ name: 'weapon', type: WeaponDTO })
  async updateWeapon(
    @Body('weapon', WeaponPipe) inWeapon: Weapon
  ): Promise<Weapon> {
    return this.weaponService.updateWeapon(inWeapon);
  }
}
