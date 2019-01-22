import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '#Environment/environment';
import { Skill } from '#Models/skill';
import { ISkillDb } from '#Models/skill.db';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  constructor(private readonly http: HttpClient) {}

  getSkills(
    charId: string
  ): Observable<{ skill: Skill[]; weapon: Skill[]; magic: Skill[] }> {
    return this.http
      .get<ISkillDb[]>(environment.apiUrl + '/character/skills/' + charId)
      .pipe(
        map((inSkills) => {
          const skillMap = {
            skill: [],
            weapon: [],
            magic: []
          };
          inSkills.forEach((skillIn) => {
            skillMap[skillIn.skType.toLowerCase()].push(
              new Skill(
                skillIn.skId,
                skillIn.skName,
                skillIn.skRanks,
                skillIn.skTrained,
                skillIn.skModifier,
                skillIn.skItemModifier,
                skillIn.skRacialModifier,
                skillIn.skMiscModifier
              )
            );
          });
          return skillMap;
        })
      );
  }
}
