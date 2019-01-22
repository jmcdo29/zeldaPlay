import { Injectable } from '@nestjs/common';
import { consoleLogger as scribe } from 'mc-scribe';

import { DbService } from '@Db/db.service';
import { DbPlayer } from '@Db/models/db_player.model';

@Injectable()
export class DbUserService {
  private schema: string;

  constructor(private readonly dbService: DbService) {
    this.schema = 'zeldaplay';
  }

  async findByEmail(email: string): Promise<DbPlayer[]> {
    const player = await this.dbService.query<DbPlayer>(
      `SELECT id as "pId" FROM ${this.schema}.players WHERE email = $1`,
      [email]
    );
    scribe('INFO', 'player', player);
    return player;
  }

  async findByToken(token: string): Promise<DbPlayer[]> {
    return this.dbService.query<DbPlayer>(
      `SELECT id as "pId" FROM ${this.schema}.players WHERE token = $1`,
      [token]
    );
  }

  async signup(email: string, password: string): Promise<DbPlayer[]> {
    return this.dbService.query<DbPlayer>(
      `INSERT INTO ${this.schema}.players
      (email, password) VALUES
      ($1, $2) RETURNING id as "pId"`,
      [email, password]
    );
  }

  async login(email: string): Promise<DbPlayer[]> {
    return this.dbService.query<DbPlayer>(
      `SELECT
        id as "pId"
        ,email as "pEmail"
        ,password as "pPassword"
      FROM ${this.schema}.players
      WHERE email = $1`,
      [email]
    );
  }
}
