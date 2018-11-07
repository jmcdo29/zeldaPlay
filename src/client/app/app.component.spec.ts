import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MaterialModule } from '#Shared/material/material.module';
import { AppComponent } from './app.component';

@Component({ selector: 'app-alert', template: '' })
class AlertStubComponent {}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MaterialModule],
      declarations: [AppComponent, AlertStubComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  test('should create the app', async(() => {
    fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  test(`should have as title 'zeldaPlay'`, async(() => {
    fixture = TestBed.createComponent(AppComponent);
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
});
