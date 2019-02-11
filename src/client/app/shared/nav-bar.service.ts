import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {
  constructor() {}

  // Observable Sources
  private navigationSource = new Subject<{ page: string }>();

  // Observable streams
  navigation$ = this.navigationSource.asObservable();

  navigate(navigation: { page: string }) {
    this.navigationSource.next(navigation);
  }
}
