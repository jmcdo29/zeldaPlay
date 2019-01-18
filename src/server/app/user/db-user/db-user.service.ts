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

  async findByEmail(email: string): Promise<DbPlayer> {
    const player = await this.dbService.query<DbPlayer>(
      `SELECT id as "pId" FROM ${this.schema}.players WHERE email = $1`,
      [email]
    )[0];
    scribe('INFO', 'player', player);
    return player;
  }

  async findByToken(token: string): Promise<DbPlayer> {
    return await this.dbService.query<DbPlayer>(
      `SELECT id as "pId" FROM ${this.schema}.players WHERE token = $1`,
      [token]
    )[0];
  }

  async signup(email: string, password: string): Promise<DbPlayer> {
    return await this.dbService.query<DbPlayer>(
      `INSERT INTO ${this.schema}.players
      (email, password) VALUES
      ($1, $2) RETURNING id as "pId"`,
      [email, password]
    )[0];
  }

  async login(email: string): Promise<DbPlayer> {
    return await this.dbService.query<DbPlayer>(
      `SELECT
        id as "pId"
        ,email as "pEmail"
        ,password as "pPassword"
      WHERE email = $1`,
      [email]
    )[0];
  }
}
