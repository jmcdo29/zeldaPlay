import { Injectable } from '@nestjs/common';
import { consoleLogger as scribe } from 'mc-scribe';
import { Pool } from 'pg';

@Injectable()
export class DbService {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL
    });
    this.pool.on('connect', () => scribe('DEBUG', 'Connected to database!'));
  }

  async query<T>(text: string, params: any[]): Promise<T[]> {
    const qStart = Date.now();
    text = text.replace(/\n\s*,/g, ', ').replace(/\n\s*/g, ' ');
    try {
      scribe('INFO', 'query', text);
      const queryRes = await this.pool.query(text, params);
      scribe('DEBUG', {
        text,
        duration: Date.now() - qStart,
        rows: queryRes.rowCount
      });
      return queryRes.rows;
    } catch (err) {
      scribe('ERROR', err.message);
      scribe('FINE', err.stack);
      return [];
    }
  }
}
