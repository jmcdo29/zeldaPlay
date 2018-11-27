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
  let backend: HttpTestingController;
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.get(UserService);
    backend = TestBed.get(HttpTestingController);

    jest.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  test('should create the user service', () => {
    expect(service).toBeDefined();
  });

  test('should allow a user to log in', () => {
    service.login('test', 'testing').subscribe();

    const getUserLogin = backend.expectOne(`${environment.apiUrl}/users/login`);
    expect(getUserLogin.request.url).toBe(`${environment.apiUrl}/users/login`);
    getUserLogin.flush({ id: '00Uuejo58sG2', accessToken: 'some token' });
    expect(sessionStorage.getItem('currentUser')).toBeTruthy();
    expect(sessionStorage.getItem('currentUser')).toBe(expectedReturn);
  });

  test('should allow a user to register', () => {
    service.register('test', 'testing', 'testing').subscribe();

    const getUserLogin = backend.expectOne(
      `${environment.apiUrl}/users/signup`
    );
    expect(getUserLogin.request.url).toBe(`${environment.apiUrl}/users/signup`);
    getUserLogin.flush({ id: '00Uuejo58sG2', accessToken: 'some token' });
    expect(sessionStorage.getItem('currentUser')).toBe(expectedReturn);
    expect(sessionStorage.getItem('currentUser')).toBeTruthy();
  });

  test('should remove a user from sessionStorage', () => {
    service.logout();
    const userLogout = backend.expectOne(`${environment.apiUrl}/users/logout`);
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
