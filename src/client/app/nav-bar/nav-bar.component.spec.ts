import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedModule } from '#Shared/shared.module';
import { NavBarComponent } from './nav-bar.component';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule],
      declarations: [NavBarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  test(`should have as title 'zeldaPlay'`, async(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('ZeldaPlay Character Tracker');
  }));
  describe('toggles', () => {
    test('about', () => {
      const about = component.showModal;
      component.about();
      expect(component.showModal).not.toBe(about);
      component.about();
      expect(component.showModal).toBe(about);
    });
    test('showTab', () => {
      component.showTab(0);
      expect(component.showRace).toBe(true);
      expect(component.showAttributes).toBe(false);
      expect(component.showSkills).toBe(false);
      component.showTab(1);
      expect(component.showRace).toBe(false);
      expect(component.showAttributes).toBe(true);
      expect(component.showSkills).toBe(false);
      component.showTab(2);
      expect(component.showRace).toBe(false);
      expect(component.showAttributes).toBe(false);
      expect(component.showSkills).toBe(true);
    });
    test('characterCreate', () => {
      const create = component.showCharacterCreate;
      component.characterCreate();
      expect(component.showCharacterCreate).not.toBe(create);
      component.characterCreate();
      expect(component.showCharacterCreate).toBe(create);
    });
    test('toggleBackground', () => {
      document.body.classList.add('light');
      component.toggleBackground();
      expect(document.body.classList).toContain('dark');
      component.toggleBackground();
      expect(document.body.classList).toContain('light');
    });
  });
  describe('sideMenu', () => {
    it('should bring the menu out', () => {
      component.showMenu();
      expect(document.getElementById('nav-bar').style.width).toBe('20%');
    });
    it('should close the menu', () => {
      component.closeMenu();
      expect(document.getElementById('nav-bar').style.width).toBe('0px');
    });
  });
  describe('handleAction', () => {
    it('should allow characters to not be clicked', () => {
      component.handleAction({ page: 'login' });
      expect(component.buttons.showLoginButton).toBeFalsy();
    });
    it('should allow login/logout to not be clicked', () => {
      component.handleAction({ page: 'character' });
      expect(component.buttons.showCharButton).toBeFalsy();
    });
    it('should allow my profile to not be clicked', () => {
      component.handleAction({ page: 'profile' });
      expect(component.buttons.showProfileButton).toBeFalsy();
    });
  });
});
