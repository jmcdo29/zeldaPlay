import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Character } from '../entities/character.entity';
import { CharacterDTO } from './interfaces/character.dto';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepo: Repository<Character>
  ) {}

  async getAll(): Promise<Array<Partial<CharacterDTO>>> {
    return this.characterRepo.find({
      select: ['id', 'race', 'name'],
      join: {
        alias: 'character',
        leftJoin: {
          user: 'character.user'
        }
      },
      where: {
        userId: process.env.DUMMY_ID
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

  newChar(userId: string, character: any): void {}

  updateChar(charId: string, character: CharacterDTO): void {}
}
