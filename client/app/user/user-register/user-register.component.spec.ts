import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { AlertService } from '../../alert/alert.service';
import { UserService } from '../user.service';
import { UserRegisterComponent } from './user-register.component';

const alertServiceStub: Partial<AlertService> = {
  error(message) {
    return message;
  }
};

describe('UserLoginComponent', () => {
  let component: UserRegisterComponent;
  let fixture: ComponentFixture<UserRegisterComponent>;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, HttpClientModule],
      declarations: [UserRegisterComponent],
      providers: [
        UserService,
        {provide: AlertService, useValue: alertServiceStub}
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
      spyOn(userService, 'register').and.returnValue(of({token: 'a long token', id: 'the userId'}));
      component.username = 'userName';
      component.password = 'password';
      component.passwordConfirmation = 'password';
      component.register();
      expect(userService.register).toHaveBeenCalled();
    });
    test('unsuccessful registration', () => {
      spyOn(userService, 'register').and.returnValue(throwError({}));
      component.username = 'userName';
      component.password = 'password';
      component.passwordConfirmation = 'password';
      component.register();
      expect(userService.register).toHaveBeenCalled();
    });
  });
});
