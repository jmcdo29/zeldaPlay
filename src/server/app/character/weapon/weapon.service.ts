import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Weapon } from 'entities/weapon.entity';

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

  async newWeapon(newWeap: Weapon, charId: string): Promise<Weapon> {
    newWeap.character.id = charId;
    return this.weaponRepo.save(newWeap);
  }

  async updateWeapon(newWeap: Weapon): Promise<Weapon> {
    return this.weaponRepo.save(newWeap);
  }
}

function parseRange(range: number[]): string {
  return range.length === 1
    ? range[0].toString()
    : range[0].toString() + ' - ' + range[range.length - 1].toString();
}
