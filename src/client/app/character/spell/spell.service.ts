import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '#Environment/environment';
import { ISpellDb } from '#Models/spell.db';
import { Spell } from '#Models/spells';
import { AbstractService } from '#Shared/abstract.service';

@Injectable({
  providedIn: 'root'
})
export class SpellService extends AbstractService {
  private spellURL = environment.apiUrl + '/character/spell/';

  constructor(private readonly http: HttpClient) {
    super();
  }

  // Get all of the spell's for a character and map the db response to the client usage
  getSpells(charId: string): Observable<Spell[]> {
    return this.http.get<ISpellDb[]>(this.spellURL + charId).pipe(
      map((inSpells) => {
        const spells = [];
        inSpells.forEach((spellIn) => {
          spells.push(
            new Spell(
              spellIn.spId,
              spellIn.spName,
              spellIn.spEffect,
              spellIn.spDamage,
              spellIn.spNumberOfHits,
              spellIn.spMpUse,
              spellIn.spDiety,
              spellIn.spUseDiety,
              spellIn.spModifier
            )
          );
        });
        return spells;
      })
    );
  }

  // send a new spell to the server and save the spell's returned id to the original object
  newSpell(charId: string, spell: Spell): Observable<Spell> {
    const spellReq = this.transform(spell);
    return this.http
      .post<ISpellDb>(
        this.spellURL + 'new/' + charId,
        { spell: spellReq },
        {
          headers: {
            authorization: 'Bearer ' + sessionStorage.getItem('userToken')
          }
        }
      )
      .pipe(
        map((retSpell) => {
          spell.id = retSpell.spId;
          return spell;
        })
      );
  }

  // send updated information about the spell to the server. Because the spell already exists with
  // up to date information, just return the spell after the request is successful
  updateSpell(spell: Spell): Observable<Spell> {
    const spellReq = this.transform(spell);
    return this.http
      .post<ISpellDb>(
        this.spellURL + 'update/' + spell.id,
        { spell: spellReq },
        {
          headers: {
            authorization: 'Bearer ' + sessionStorage.getItem('userToken')
          }
        }
      )
      .pipe(
        map(() => {
          return spell;
        })
      );
  }
}
