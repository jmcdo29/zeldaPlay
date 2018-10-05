import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Character } from '../entities/character_schema';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepo: Repository<Character>
  ) {}

  async getAll(): Promise<Array<Partial<Character>>> {
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

  getOne() {}

  getUserChars() {}

  upsertChar() {}
}
