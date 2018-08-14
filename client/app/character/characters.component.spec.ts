import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { AlertService } from '../alert/alert.service';
import { CharactersComponent } from './characters.component';

@Component({ selector: 'app-character-detail', template: '' })
class CharacterDetailStubComponent {
  @Input()
  character;
}

// tslint:disable-next-line:max-classes-per-file
@Component({ selector: 'app-character-create', template: '' })
class CharacterCreateStubComponent {
  @Input()
  CharacterParent;
}

// tslint:disable-next-line:max-classes-per-file
@Component({ selector: 'app-messages', template: '' })
class MessageStubComponent {}

let alertServiceStub: Partial<AlertService>;

alertServiceStub = {
  getMessage(): any {}
};

describe('CharactersComponent', () => {
  let component: CharactersComponent;
  let fixture: ComponentFixture<CharactersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, HttpClientModule],
      declarations: [
        CharactersComponent,
        CharacterCreateStubComponent,
        CharacterDetailStubComponent,
        MessageStubComponent
      ],
      providers: [{ provide: AlertService, useValue: alertServiceStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
