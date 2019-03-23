import { Injectable } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CharacterService } from './character.service';

@Injectable()
export class CharacterHealthIndicator extends HealthIndicator {
  constructor(private readonly charService: CharacterService) {
    super();
    console.log('CharacterHealthIndicator constructed');
  }

  isHealthy(key: string): Observable<HealthIndicatorResult> {
    return this.charService.getAll().pipe(
      map((characters) => {
        const deadChars = characters.filter((char) => char.chHealth <= 0);
        return this.getStatus(key, characters.length > 0, {
          dead: deadChars.length
        });
      })
    );
  }
}
