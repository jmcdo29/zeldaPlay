import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from '#Shared/material/material.module';
import { MessagesComponent } from '#Shared/messages/messages.component';

describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [MessagesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should toggle the show variable', () => {
    component.showMessages();
    expect(component.show);
    component.showMessages();
    expect(!component.show);
  });
});
