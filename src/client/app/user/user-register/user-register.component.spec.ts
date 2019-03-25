import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { AlertService } from '#Alert/alert.service';
import { MaterialModule } from '#Shared/material/material.module';
import { UserService } from '../user.service';
import { UserRegisterComponent } from './user-register.component';

const alertServiceStub: Partial<AlertService> = {
  error(message) {
    return message;
  },
  clear() {
    return;
  }
};

const pa = 'password';

describe('UserLoginComponent', () => {
  let component: UserRegisterComponent;
  let fixture: ComponentFixture<UserRegisterComponent>;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientModule,
        MaterialModule
      ],
      declarations: [UserRegisterComponent],
      providers: [
        UserService,
        { provide: AlertService, useValue: alertServiceStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegisterComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('registration function', () => {
    test('successful registration', () => {
      spyOn(userService, 'register').and.returnValue(
        of({ token: 'a long token', id: 'the userId' })
      );
      component.username = 'userName';
      component.password = pa;
      component.passwordConfirmation = pa;
      component.register();
      expect(userService.register).toHaveBeenCalled();
    });
    test('unsuccessful registration', () => {
      spyOn(userService, 'register').and.returnValue(throwError({}));
      component.username = 'userName';
      component.password = pa;
      component.passwordConfirmation = pa;
      component.register();
      expect(userService.register).toHaveBeenCalled();
    });
  });
});
