import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { AlertService } from '../../alert/alert.service';
import { UserService } from '../user.service';
import { UserLoginComponent } from './user-login.component';

const alertServiceStub: Partial<AlertService> = {
  error(message) {
    return message;
  }
};

describe('UserLoginComponent', () => {
  let component: UserLoginComponent;
  let fixture: ComponentFixture<UserLoginComponent>;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, HttpClientModule],
      declarations: [UserLoginComponent],
      providers: [
        UserService,
        {provide: AlertService, useValue: alertServiceStub}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('login function', () => {
    test('successful function', () => {
      spyOn(userService, 'login').and.returnValue(of({
        token: 'a really long token',
        id: 'the userId'
      }));
      component.username = 'user';
      component.password = 'pass';
      component.login();
      expect(userService.login).toHaveBeenCalled();
    });
    test('unsuccessful login', () => {
      spyOn(userService, 'login').and.returnValue(throwError({}));
      component.username = 'user';
      component.password = 'pass';
      component.login();
      expect(userService.login).toHaveBeenCalled();
    });
  });
});
