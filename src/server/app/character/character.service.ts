import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Character } from '../entities/character_schema';
import { CharacterDTO } from './interfaces/characterDTO';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepo: Repository<Character>
  ) {}

  async getAll(): Promise<Array<Partial<CharacterDTO>>> {
    return this.characterRepo.find({
      select: ['id', 'race', 'subrace'],
      join: {
        alias: 'character',
        leftJoin: {
          user: 'character.user'
        }
      },
      where: {
        userId: '00Csntj8Gozz'
      }
    });
  }

  async getOne(charId: string): Promise<Partial<CharacterDTO>> {
    return this.characterRepo.findOne(charId, {
      relations: ['skills', 'saves'],
      where: {
        id: charId
      },
      cache: true
    });
  }

  getUserChars(userId: string): void {}

  upsertChar(userId: string, character: any): void {}
}
