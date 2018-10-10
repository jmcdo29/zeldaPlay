import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Character } from 'entities/character.entity';

import { CharacterDTO } from './interfaces/character.dto';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepo: Repository<Character>
  ) {}

  async getAll(): Promise<Character[]> {
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

  async getOne(charId: string): Promise<Character> {
    return this.characterRepo.findOne(charId, {
      relations: ['skills', 'saves'],
      where: {
        id: charId
      }
    });
  }

  async getUserChars(userId: string): Promise<Character[]> {
    return this.characterRepo.find({
      select: ['id', 'name', 'race'],
      where: {
        userId
      },
      cache: true
    });
  }

  async newChar(inChar: CharacterDTO, userId: string): Promise<Character> {
    const character = await this.characterRepo.create(inChar);

    return this.characterRepo.save(character);
  }

  async updateChar(inChar: CharacterDTO): Promise<Character> {
    const character = await this.characterRepo.create(inChar);

    return this.characterRepo.save(character);
  }
}
