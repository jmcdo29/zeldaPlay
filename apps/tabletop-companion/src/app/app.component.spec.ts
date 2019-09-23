import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Message } from '@tabletop-companion/api-interface';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { AppService } from './app.service';

@Component({ selector: 'tabletop-companion-message', template: '' })
class MessageMockComponent {
  @Input()
  message: Message;
}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let service: AppService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AppComponent, MessageMockComponent],
      providers: [
        {
          provide: AppService,
          useValue: {
            getHello: jest
              .fn()
              .mockReturnValue(of<Message>({ message: 'Welcome to api!' })),
          },
        },
      ],
    }).compileComponents();
  }));

  describe('successes', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      service = TestBed.get(AppService);
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
    it('should update the name', () => {
      service.getHello = jest
        .fn()
        .mockReturnValueOnce(of<Message>({ message: 'Hello, Tester!' }));
      component.name.setValue('Tester');
      expect(component.name.value).toBe('Tester');
    });
  });
});
