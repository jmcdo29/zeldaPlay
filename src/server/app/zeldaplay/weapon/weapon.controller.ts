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
import { WeaponDTO } from '@Body/index';
import { DbWeapon } from '@DbModel/index';
import { CharacterIdParam, WeaponIdParam } from '@Parameter/index';
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
  @ApiImplicitParam({ name: 'charId', type: 'string', required: true })
  @ApiOkResponse({ type: DbWeapon, isArray: true })
  async getWeapons(@Param() params: CharacterIdParam): Promise<DbWeapon[]> {
    return this.weaponService.getWeapons(params.charId);
  }

  @Post('new/:charId')
  @ApiOperation({
    title: 'New Weapon',
    description: 'Create a new weapon for the character.'
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiImplicitParam({ name: 'charId', type: 'string', required: true })
  @ApiImplicitBody({ name: 'weapon', type: WeaponDTO })
  @ApiOkResponse({ type: DbWeapon })
  async newWeapon(
    @Body('weapon', WeaponPipe) inWeapon: DbWeapon,
    @Param() params: CharacterIdParam
  ): Promise<DbWeapon> {
    return this.weaponService.newWeapon(inWeapon, params.charId);
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
    @Body('weapon', WeaponPipe) inWeapon: DbWeapon,
    @Param() params: WeaponIdParam
  ): Promise<DbWeapon> {
    return this.weaponService.updateWeapon(inWeapon);
  }
}
