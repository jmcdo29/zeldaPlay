import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';

import { AlertComponent } from '#Alert/alert.component';
import { AlertService } from '#Alert/alert.service';

const alertServiceStub: Partial<AlertService> = {
  getMessage(): Observable<any> {
    return of('string');
  },
  clear(): void {
    return;
  }
};

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AlertComponent],
      providers: [{ provide: AlertService, useValue: alertServiceStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('remove any message', () => {
    component.message = ';lajsdfljas;lkdf';
    component.remove();
    expect(component.message).toBe('');
  });
  test('testDestroy', () => {
    component.ngOnDestroy();
  });
});
