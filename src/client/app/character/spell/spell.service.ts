import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '#Environment/environment';
import { ISpellDb } from '#Models/spell.db';
import { Spell } from '#Models/spells';

@Injectable({
  providedIn: 'root'
})
export class SpellService {
  constructor(private readonly http: HttpClient) {}

  getSpells(charId: string): Observable<Spell[]> {
    return this.http
      .get<ISpellDb[]>(environment.apiUrl + '/character/spell/' + charId)
      .pipe(
        map((inSpells) => {
          const spells = [];
          inSpells.forEach((spellIn) => {
            spells.push(
              new Spell(
                spellIn.id,
                spellIn.name,
                spellIn.effect,
                spellIn.damage,
                spellIn.number_of_hit,
                spellIn.mp_use,
                spellIn.diety,
                spellIn.use_diety,
                spellIn.modifier
              )
            );
          });
          return spells;
        })
      );
  }
}
