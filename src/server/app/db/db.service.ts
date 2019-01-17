import { Injectable, Logger } from '@nestjs/common';
import { consoleLogger as scribe } from 'mc-scribe';
import { Pool } from 'pg';

import { DbNote } from './models/db_note.model';
import { DbSpell } from './models/db_spell.table';
import { DbWeapon } from './models/db_weapon.model';

@Injectable()
export class DbService {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_url
    });
    this.pool.on('connect', () => scribe('DEBUG', 'Connected to database!'));
  }

  async query<T>(text: string, params: any[]): Promise<T[]> {
    const qStart = Date.now();
    try {
      const queryRes = await this.pool.query(text.replace(/\n\s*,/g, ', ').replace(/\n\s*/g, ' '), params);
      scribe('DEBUG', `Retrieved ${queryRes.rowCount} records in ${Date.now() - qStart} ms.`);
      return queryRes.rows;
    } catch (err) {
      scribe('ERROR', err.message);
      scribe('FINE', err.stack);
      return [];
    }
  }
}
