import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Weapon } from 'entities/weapon.entity';

import { WeaponDTO } from './interfaces/weapon.dto';

@Injectable()
export class WeaponService {
  constructor(
    @InjectRepository(Weapon) private readonly weaponRepo: Repository<Weapon>
  ) {}

  async getWeapons(charId: string): Promise<Weapon[]> {
    return this.weaponRepo.find({
      where: {
        characterId: charId
      }
    });
  }

  async newWeapon(newWeap: WeaponDTO, charId: string): Promise<Weapon> {
    const weapon = await this.weaponRepo.create(newWeap);
    weapon.damage = newWeap.attack;
    weapon.number_of_hits = newWeap.numberOfAttacks;
    weapon.crit_range = parseRange(newWeap.critRange);
    weapon.crit_multiplier = newWeap.critDamage;
    weapon.character.id = charId;
    return this.weaponRepo.save(weapon);
  }

  async updateWeapon(newWeap: WeaponDTO): Promise<Weapon> {
    const weapon = await this.weaponRepo.create(newWeap);
    weapon.damage = newWeap.attack;
    weapon.number_of_hits = newWeap.numberOfAttacks;
    weapon.crit_range = parseRange(newWeap.critRange);
    weapon.crit_multiplier = newWeap.critDamage;
    return this.weaponRepo.save(weapon);
  }
}

function parseRange(range: number[]): string {
  return range.length === 1
    ? range[0].toString()
    : range[0].toString() + ' - ' + range[range.length - 1].toString();
}
