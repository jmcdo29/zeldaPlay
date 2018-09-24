import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { environment } from '../../environments/environment';
import { UserService } from './user.service';

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
    const expectedReturn = '00Uuejo58sG2';
    let actualReturn: string;
    service.login('test', 'testing').subscribe((id) => {
      localStorage.setItem('currentUser', id);
      actualReturn = id;
    });

    const getUserLogin = backend.expectOne(`${environment.apiUrl}/users/login`);
    expect(getUserLogin.request.url).toBe(`${environment.apiUrl}/users/login`);
    getUserLogin.flush('00Uuejo58sG2');
    expect(actualReturn).toBe(expectedReturn);
    expect(localStorage.getItem('currentUser')).toBeTruthy();
    expect(localStorage.getItem('currentUser')).toBe(expectedReturn);
  });

  test('should allow a user to register', () => {
    const expectedReturn = '00Uuejo58sG2';
    let actualReturn: string;
    service.register('test', 'testing', 'testing').subscribe((id) => {
      localStorage.setItem('currentUser', id);
      actualReturn = id;
    });

    const getUserLogin = backend.expectOne(
      `${environment.apiUrl}/users/signup`
    );
    expect(getUserLogin.request.url).toBe(`${environment.apiUrl}/users/signup`);
    getUserLogin.flush('00Uuejo58sG2');
    expect(actualReturn).toBe(expectedReturn);
    expect(localStorage.getItem('currentUser')).toBeTruthy();
    expect(localStorage.getItem('currentUser')).toBe(expectedReturn);
  });

  test('should remove a user from localStorage', () => {
    service.logout();
    expect(localStorage.getItem('currentUser')).toBeFalsy();
  });

  afterEach(inject(
    [HttpTestingController],
    (_httpClient: HttpTestingController) => {
      _httpClient.verify();
    }
  ));
});
