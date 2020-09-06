import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserIdDTO } from '../auth/user/models';
import { DatabaseService } from '../database/database.service';
import {
  CharacterDTO,
  CharacterIdDTO,
  CharacterInsertDataDTO,
  CharacterUpdateDataDTO,
} from './models';
import { DatabaseTable } from '../database/database.decorator';

@Injectable()
export class CharacterService {
  constructor(
    @DatabaseTable('characters')
    private readonly db: DatabaseService<CharacterDTO>,
  ) {}

  getCharacterById(id: CharacterIdDTO): Observable<CharacterDTO> {
    const fields: string[] = [];
    fields.push('id as id');
    fields.push('name');
    fields.push('race');
    fields.push('subrace');
    fields.push('experience');
    fields.push('max_health');
    fields.push('health');
    fields.push('is_dead');
    fields.push('player_id');
    fields.push('level');
    fields.push('alignment');
    fields.push('background');
    fields.push('ideal');
    fields.push('bond');
    fields.push('flaw');
    fields.push('personality_traits');
    fields.push('proficiencies');
    fields.push('languages');
    fields.push('game');
    const query = fields.join(', ');
    const where = 'id = $1;';
    return this.db
      .query(
        {
          query,
          where,
          variables: [id.id],
        },
        CharacterDTO,
      )
      .pipe(map((characters) => characters[0]));
  }

  getCharactersByUserId(userId: UserIdDTO): Observable<CharacterDTO[]> {
    const fields: string[] = [];
    fields.push('id');
    fields.push('name');
    fields.push('race');
    fields.push('subrace');
    fields.push('experience');
    fields.push('max_health');
    fields.push('health');
    fields.push('is_dead');
    fields.push('player_id');
    fields.push('level');
    fields.push('alignment');
    fields.push('background');
    fields.push('ideal');
    fields.push('bond');
    fields.push('flaw');
    fields.push('personality_traits');
    fields.push('proficiencies');
    fields.push('languages');
    fields.push('game');
    const query = fields.join(', ');
    const where = 'player_id = $1;';
    return this.db.query(
      {
        query,
        where,
        variables: [userId.id],
      },
      CharacterDTO,
    );
  }

  insertNewCharacter(
    characterData: CharacterInsertDataDTO,
  ): Observable<CharacterDTO> {
    const params: { values: string[]; fields: string[] } = {
      values: [],
      fields: [],
    };
    const charVariables: any[] = [];
    params.fields.push('name');
    charVariables.push(characterData.name);
    params.fields.push('race');
    charVariables.push(characterData.race);
    params.fields.push('subrace');
    charVariables.push(characterData.subrace);
    params.fields.push('experience');
    charVariables.push(characterData.experience);
    params.fields.push('max_health');
    charVariables.push(characterData.maxHealth);
    params.fields.push('health');
    charVariables.push(characterData.health);
    params.fields.push('is_dead');
    charVariables.push(characterData.isDead);
    params.fields.push('player_id');
    charVariables.push(characterData.playerId);
    params.fields.push('level');
    charVariables.push(characterData.level);
    params.fields.push('alignment');
    charVariables.push(characterData.alignment);
    params.fields.push('background');
    charVariables.push(characterData.background);
    params.fields.push('ideal');
    charVariables.push(characterData.ideal);
    params.fields.push('bond');
    charVariables.push(characterData.bond);
    params.fields.push('flaw');
    charVariables.push(characterData.flaw);
    params.fields.push('personality_traits');
    charVariables.push(characterData.personalityTraits);
    params.fields.push('proficiencies');
    charVariables.push(characterData.proficiencies);
    params.fields.push('languages');
    charVariables.push(characterData.languages);
    params.fields.push('game');
    charVariables.push(characterData.game);
    for (let i = 1; i <= params.fields.length; i++) {
      params.values.push(`$${i}`);
    }
    return this.db
      .insert(
        {
          query: params.fields.join(', '),
          where: params.values.join(', '),
          variables: charVariables,
        },
        CharacterDTO,
      )
      .pipe(map((characters) => characters[0]));
  }

  updateCharacter(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    characterData: CharacterUpdateDataDTO,
  ): Observable<CharacterDTO> {
    return this.db
      .update({ query: '', variables: [] }, CharacterDTO)
      .pipe(map((characters) => characters[0]));
  }
}
