import { Injectable } from '@nestjs/common';
import { Character } from '@tabletop-companion/api-interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class CharacterService {
  constructor(private readonly db: DatabaseService) {}

  getCharacterById(id: string): Observable<Character> {
    return this.db
      .query<Character>({
        query: 'SELECT * FROM characters WHERE id = $1',
        variables: [id]
      })
      .pipe(map((characters) => characters[0]));
  }

  getCharactersByUserId(userId: string): Observable<Character[]> {
    return this.db.query<Character>({
      query: 'SELECT * FROM characters WHERE "playerId" = $1',
      variables: [userId]
    });
  }
}
