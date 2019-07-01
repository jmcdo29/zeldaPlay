import { Injectable } from '@nestjs/common';
import {
  Character,
  CharacterId,
  CharacterInsertData,
  CharacterUpdateData,
  UserId
} from '@tabletop-companion/api-interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class CharacterService {
  constructor(private readonly db: DatabaseService) {}

  getCharacterById(id: CharacterId): Observable<Character> {
    const fields = [];
    fields.push('id as id');
    fields.push('name as name');
    fields.push('race as race');
    fields.push('subrace as subrace');
    fields.push('experience as experience');
    fields.push('max_health as "maxHealth"');
    fields.push('health as health');
    fields.push('is_dead as "isDead"');
    fields.push('player_id as "playerId"');
    fields.push('level as level');
    fields.push('alignment as alignment');
    fields.push('background as background');
    fields.push('ideal as ideal');
    fields.push('bond as bond');
    fields.push('flaw as flaw');
    fields.push('personality_traits as "personalityTraits"');
    fields.push('proficiencies as proficiencies');
    fields.push('languages as languages');
    fields.push('game as game');
    const query =
      'SELECT ' + fields.join(', ') + ' FROM characters WHERE id = $1;';
    return this.db
      .query<Character>({
        query,
        variables: [id.id]
      })
      .pipe(map((characters) => characters[0]));
  }

  getCharactersByUserId(userId: UserId): Observable<Character[]> {
    const fields = [];
    fields.push('id as id');
    fields.push('name as name');
    fields.push('race as race');
    fields.push('subrace as subrace');
    fields.push('experience as experience');
    fields.push('max_health as "maxHealth"');
    fields.push('health as health');
    fields.push('is_dead as "isDead"');
    fields.push('player_id as "playerId"');
    fields.push('level as level');
    fields.push('alignment as alignment');
    fields.push('background as background');
    fields.push('ideal as ideal');
    fields.push('bond as bond');
    fields.push('flaw as flaw');
    fields.push('personality_traits as "personalityTraits"');
    fields.push('proficiencies as proficiencies');
    fields.push('languages as languages');
    fields.push('game as game');
    const query =
      'SELECT ' + fields.join(', ') + ' FROM characters WHERE player_id = $1;';
    return this.db.query<Character>({
      query,
      variables: [userId.id]
    });
  }

  insertNewCharacter(
    characterData: CharacterInsertData
  ): Observable<Character> {
    const params: { values: string[]; fields: string[] } = {
      values: [],
      fields: []
    };
    const charVariables: any[] = [];
    let query = 'INSERT INTO characters (';
    params.fields.push('name');
    params.values.push('$1');
    charVariables.push(characterData.name);
    params.fields.push('race');
    params.values.push('$2');
    charVariables.push(characterData.race);
    params.fields.push('subrace');
    params.values.push('$3');
    charVariables.push(characterData.subrace);
    params.fields.push('experience');
    params.values.push('$4');
    charVariables.push(characterData.experience);
    params.fields.push('max_health');
    params.values.push('$5');
    charVariables.push(characterData.maxHealth);
    params.fields.push('health');
    params.values.push('$6');
    charVariables.push(characterData.health);
    params.fields.push('is_dead');
    params.values.push('$7');
    charVariables.push(characterData.isDead);
    params.fields.push('player_id');
    params.values.push('$8');
    charVariables.push(characterData.playerId);
    params.fields.push('level');
    params.values.push('$9');
    charVariables.push(characterData.level);
    params.fields.push('alignment');
    params.values.push('$10');
    charVariables.push(characterData.alignment);
    params.fields.push('background');
    params.values.push('$11');
    charVariables.push(characterData.background);
    params.fields.push('ideal');
    params.values.push('$12');
    charVariables.push(characterData.ideal);
    params.fields.push('bond');
    params.values.push('$13');
    charVariables.push(characterData.bond);
    params.fields.push('flaw');
    params.values.push('$14');
    charVariables.push(characterData.flaw);
    params.fields.push('personality_traits');
    params.values.push('$15');
    charVariables.push(characterData.personalityTraits);
    params.fields.push('proficiencies');
    params.values.push('$16');
    charVariables.push(characterData.proficiencies);
    params.fields.push('languages');
    params.values.push('$17');
    charVariables.push(characterData.languages);
    params.fields.push('game');
    params.values.push('$18');
    charVariables.push(characterData.game);
    query += params.fields.join(', ');
    query += ') VALUES (';
    query += params.values.join(', ');
    query += ') RETURNING id;';
    return this.db.query<Character>({ query, variables: charVariables }).pipe(
      map((characters) => characters[0]),
      map((character) => {
        for (const key of Object.keys(characterData)) {
          character[key] = characterData[key];
        }
        return character;
      })
    );
  }

  updateCharacter(
    characterData: CharacterUpdateData,
    charId: CharacterId
  ): Observable<Character> {
    return this.db
      .query<Character>({ query: '', variables: [] })
      .pipe(map((characters) => characters[0]));
  }
}
