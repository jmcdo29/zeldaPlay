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
            skillMap[skillIn.skill_type].push(
              new Skill(
                skillIn.id,
                skillIn.name,
                skillIn.ranks,
                skillIn.trained,
                skillIn.modifier,
                skillIn.item_modifier,
                skillIn.racial_modifier,
                skillIn.misc_modifier
              )
            );
          });
          return skillMap;
        })
      );
  }
}
