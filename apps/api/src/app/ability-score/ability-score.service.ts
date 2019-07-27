import { Injectable } from '@nestjs/common';
import {
  AbilityScore,
  AbilityScoreId,
  AbilityScoreInput,
  AbilityScoreUpdate,
  CharacterId,
} from '@tabletop-companion/api-interface';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class AbilityScoreService {
  constructor(private readonly db: DatabaseService) {}

  getAbilityScoresByCharId(charId: CharacterId): Observable<AbilityScore[]> {
    const fields = [];
    fields.push('id as is');
    fields.push('name as name');
    fields.push('value as value');
    fields.push('character_id as "characterId"');
    const query =
      'SELECT ' +
      fields.join(', ') +
      ' FROM ability_scores WHERE character_id = $1;';
    return this.db.query<AbilityScore>({ query, variables: [charId.id] });
  }

  getAbilityScoreById(abilityId: AbilityScoreId): Observable<AbilityScore> {
    const fields = [];
    fields.push('id as is');
    fields.push('name as name');
    fields.push('value as value');
    fields.push('character_id as "characterId"');
    const query =
      'SELECT ' + fields.join(', ') + ' FROM ability_scores WHERE id = $1;';
    return this.db
      .query<AbilityScore>({ query, variables: [abilityId.id] })
      .pipe(map((abilityScores) => abilityScores[0]));
  }

  insertOneAbilityScore(ability: AbilityScoreInput): Observable<AbilityScore> {
    let query = 'INSERT INTO ability_scores (';
    const params: { fields: string[]; values: string[] } = {
      fields: [],
      values: [],
    };
    const abilVariables = [];
    params.fields.push('name');
    abilVariables.push(ability.name);
    params.fields.push('value');
    abilVariables.push(ability.value);
    params.fields.push('character_id');
    abilVariables.push(ability.characterId);
    for (let i = 1; i <= params.fields.length; i++) {
      params.values.push(`$${i}`);
    }
    query += params.fields.join(', ');
    query += ') VALUES (';
    query += params.values.join(', ');
    query += ') RETURNING id;';
    return this.db
      .query<AbilityScore>({ query, variables: abilVariables })
      .pipe(
        map((abilityScores) => abilityScores[0]),
        map((abilityScore) => ({
          id: abilityScore.id,
          ...ability,
        })),
      );
  }

  insertManyAbilityScores(
    abilities: AbilityScoreInput[],
  ): Observable<AbilityScore[]> {
    let query = 'INSERT INTO ability_scores (';
    const params: { fields: string[]; values: string[] } = {
      fields: [],
      values: [],
    };
    params.fields.push('name');
    params.fields.push('value');
    params.fields.push('character_id');
    const abilVariables = [];
    for (let i = 0; i < abilities.length; i++) {
      abilVariables.push(
        abilities[i].name,
        abilities[i].value,
        abilities[i].characterId,
      );
      params.values.push(`$${i * 3 + 1}, $${i * 3 + 2}, $${i * 3 + 3}`);
    }
    query += params.fields.join(', ');
    query += ') VALUES (';
    query += params.values.join('), (');
    query += ') RETURNING id;';
    return this.db
      .query<AbilityScore>({ query, variables: abilVariables })
      .pipe(
        map((abs) => {
          for (let i = 0; i < abs.length; i++) {
            abs[i] = {
              id: abs[i].id,
              ...abilities[i],
            };
          }
          return abs;
        }),
      );
  }

  updateOneAbilityScore(ability: AbilityScoreUpdate): Observable<AbilityScore> {
    let query = 'UPDATE ability_scores SET';
    query += ' value = $1';
    query += ' WHERE id = $2';
    query += ' RETURNING id;';
    return this.db
      .query<AbilityScore>({ query, variables: [ability.value, ability.id] })
      .pipe(
        map((abilityScores) => abilityScores[0]),
        mergeMap((abilityScore) => {
          return this.getAbilityScoreById({ id: abilityScore.id });
        }),
      );
  }

  updateManyAbilityScores(
    abilities: AbilityScoreUpdate[],
  ): Observable<AbilityScore[]> {
    const variables = [];
    let query = 'UPDATE ability_scores as scores SET ';
    query += 'scores.value = incoming.value';
    query += 'FROM (VALUES ';
    for (let i = 0; i < abilities.length; i++) {
      query += `($${i * 2 + 1}, $${i * 2 + 2}),`;
      variables.push(abilities[i].value, abilities[i].id);
    }
    query.substring(0, query.length - 1);
    query += ') AS incoming(values, id)';
    query += ' WHERE incoming.id = scores.id;';
    return this.db.query<AbilityScore>({ query, variables }).pipe(
      mergeMap(() => {
        const ids = [];
        for (const abil of abilities) {
          ids.push(abil.id);
        }
        return this.db.query<AbilityScore>({
          query:
            'SELECT id, name, value, character_id as "characterId" FROM ability_scores WHERE id IN $1;',
          variables: [ids],
        });
      }),
    );
  }
}
