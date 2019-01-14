import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DbService {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_url
    });
  }

  private query() {}

  async queryCharacters() {}

  async queryCharacterOne() {}

  async queryCharacterWeapons() {}

  async queryCharacterSpells() {}

  async queryCharacterNotes() {}
}
