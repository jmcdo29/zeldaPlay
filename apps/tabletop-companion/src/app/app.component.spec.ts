import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Message } from '@tabletop-companion/api-interface';
import { AppComponent } from './app.component';

@Component({ selector: 'tabletop-companion-message', template: '' })
class MessageMockComponent {
  @Input()
  message: Message;
}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AppComponent, MessageMockComponent],
    }).compileComponents();
  }));

  describe('successes', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.debugElement.componentInstance;
      fixture.detectChanges();
    });

    it('should create the app', () => {
      expect(component).toBeTruthy();
    });
    it('should sayHello', (done) => {
      component.hello$.subscribe({
        next(value) {
          expect(value).toEqual({ message: 'Welcome to api!' });
        },
        error(error: Error) {
          throw error;
        },
        complete() {
          done();
        },
      });
    });
  });
});
