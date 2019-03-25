import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { environment } from '#Environment/environment';
import { UserService } from './user.service';

const expectedReturn = '00Uuejo58sG2';

describe('#UserService', () => {
  let backEnd: HttpTestingController;
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.get(UserService);
    backEnd = TestBed.get(HttpTestingController);

    jest.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  test('should create the user service', () => {
    expect(service).toBeDefined();
  });

  test('should allow a user to log in', () => {
    service.login('test', 'testing').subscribe();

    const getUserLogin = backEnd.expectOne(`${environment.apiUrl}/login`);
    expect(getUserLogin.request.url).toBe(`${environment.apiUrl}/login`);
    getUserLogin.flush({ id: 'expectedReturn', accessToken: 'some token' });
    expect(sessionStorage.getItem('currentUser')).toBeTruthy();
    expect(sessionStorage.getItem('currentUser')).toBe(expectedReturn);
  });

  test('should allow a user to register', () => {
    service
      .register({
        email: 'test',
        password: 'testing',
        confirmationPassword: 'testing',
        recovery: []
      })
      .subscribe();

    const getUserLogin = backEnd.expectOne(`${environment.apiUrl}/signup`);
    expect(getUserLogin.request.url).toBe(`${environment.apiUrl}/signup`);
    getUserLogin.flush({ id: 'expectedReturn', accessToken: 'some token' });
    expect(sessionStorage.getItem('currentUser')).toBe(expectedReturn);
    expect(sessionStorage.getItem('currentUser')).toBeTruthy();
  });

  test('should remove a user from sessionStorage', () => {
    service.logout();
    const userLogout = backEnd.expectOne(`${environment.apiUrl}/logout`);
    userLogout.flush({});
    expect(sessionStorage.getItem('currentUser')).toBeFalsy();
  });

  afterEach(inject(
    [HttpTestingController],
    (_httpClient: HttpTestingController) => {
      _httpClient.verify();
    }
  ));
});
