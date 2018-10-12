import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Character } from '../entities/character.entity';

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

  async newChar(inChar: Character, userId: string): Promise<Character> {
    return this.characterRepo.save(inChar);
  }

  async updateChar(inChar: Character): Promise<Character> {
    await this.characterRepo
      .createQueryBuilder()
      .update()
      .set(inChar)
      .where('id=:id', { id: inChar.id })
      .execute();
    await this.characterRepo
      .createQueryBuilder()
      .relation(Character, 'skills')
      .of(inChar.id)
      .add(inChar.skills);
    await this.characterRepo
      .createQueryBuilder()
      .relation(Character, 'saves')
      .of(inChar.id)
      .add(inChar.saves);
    return inChar;
  }
}
