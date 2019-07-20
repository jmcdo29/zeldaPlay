import { async, TestBed } from '@angular/core/testing';
import { Message } from '@tabletop-companion/api-interface';
import { of, throwError } from 'rxjs';
import { AppComponent } from './app.component';
import { AppService } from './app.service';

describe('AppComponent', () => {
  let component: AppComponent;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        {
          provide: AppService,
          useValue: {
            getHello: jest
              .fn()
              .mockReturnValue(of<Message>({ message: 'Welcome to api!' }))
          }
        }
      ]
    }).compileComponents();
  }));

  describe('successes', () => {
    beforeEach(() => {
      const fixture = TestBed.createComponent(AppComponent);
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
        }
      });
    });
  });
});
