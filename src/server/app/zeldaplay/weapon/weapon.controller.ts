import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiImplicitBody,
  ApiImplicitParam,
  ApiOkResponse,
  ApiOperation,
  ApiUseTags
} from '@nestjs/swagger';

import { AuthGuard } from '@Auth/auth.guard';
import { DbWeapon } from '@DbModel/db_weapon.model';
import { WeaponDTO } from '@Models/weapon/weapon.dto';
import { WeaponPipe } from '@Weapon/weapon.pipe';
import { WeaponService } from '@Weapon/weapon.service';

@ApiUseTags('weapon')
@Controller('character/weapon')
export class WeaponController {
  constructor(private readonly weaponService: WeaponService) {}

  @Get(':charId')
  @ApiOperation({
    title: 'Get Weapons',
    description: 'Get all the weapons of the specified character.'
  })
  @ApiOkResponse({ type: DbWeapon, isArray: true })
  async getWeapons(@Param('charId') charId: string): Promise<DbWeapon[]> {
    return this.weaponService.getWeapons(charId);
  }

  @Post('new/:charId')
  @ApiOperation({
    title: 'New Weapon',
    description: 'Create a new weapon for the character.'
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiImplicitBody({ name: 'weapon', type: WeaponDTO })
  @ApiOkResponse({ type: DbWeapon })
  async newWeapon(
    @Body('weapon', WeaponPipe) inWeapon: DbWeapon,
    @Param('charId') charId: string
  ): Promise<DbWeapon> {
    return this.weaponService.newWeapon(inWeapon, charId);
  }

  @Post('update/:weaponId')
  @ApiOperation({
    title: 'Update Weapon',
    description: 'Update the weapon saved in the database with the specified id'
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: DbWeapon })
  @ApiImplicitParam({ name: 'weaponId', type: 'string', required: true })
  @ApiImplicitBody({ name: 'weapon', type: WeaponDTO })
  async updateWeapon(
    @Body('weapon', WeaponPipe) inWeapon: DbWeapon
  ): Promise<DbWeapon> {
    return this.weaponService.updateWeapon(inWeapon);
  }
}
