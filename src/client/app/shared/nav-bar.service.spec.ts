import { TestBed } from '@angular/core/testing';

import { NavBarService } from './nav-bar.service';

describe('NavBarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NavBarService = TestBed.get(NavBarService);
    expect(service).toBeTruthy();
  });

  describe('navigate', () => {
    it('should move to the next object', () => {
      const service: NavBarService = TestBed.get(NavBarService);
      service.navigate({ page: 'hello' });
      service.navigation$.subscribe((page) => expect(page.page).toBe('hello'));
    });
  });
});
