import { Injectable } from '@nestjs/common';

import { DbService } from '@Db/db.service';
import { DbPlayer } from '@DbModel/index';
import { Observable } from 'rxjs';

@Injectable()
export class DbUserService {
  private schema: string;

  constructor(private readonly dbService: DbService) {
    this.schema = 'zeldaplay';
  }

  findByEmail(email: string): Observable<DbPlayer[]> {
    return this.dbService.query<DbPlayer>(
      `SELECT id as "pId" FROM ${this.schema}.players WHERE email = $1`,
      [email]
    );
  }

  signup(email: string, password: string): Observable<DbPlayer[]> {
    return this.dbService.query<DbPlayer>(
      `INSERT INTO ${this.schema}.players
      (email, password) VALUES
      ($1, $2) RETURNING id as "pId"`,
      [email, password]
    );
  }

  login(email: string): Observable<DbPlayer[]> {
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
