import {async, TestBed} from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateUserRequest, UserResponse } from '../model/userResponse';
import { defer, Observable, of, throwError } from 'rxjs';

/** Create async observable that emits-once and completes
 *  after a JS engine turn
 */
export function asyncData<T>(data: T): Observable<any> {
  return defer(() => Promise.resolve(data));
}

/** Create async observable error that errors
 *  after a JS engine turn
 */
export function asyncError<T>(errorObject: any): Observable<any> {
  return defer(() => Promise.reject(errorObject));
}

describe('AuthenticationService', () => {
  let httpClientSpy: {
    get: jasmine.Spy,
    post: jasmine.Spy,
    put: jasmine.Spy,
    delete: jasmine.Spy
  };
  let authService: AuthenticationService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      HttpClientTestingModule
    ],
    providers: [
      ReactiveFormsModule
    ]
  }));

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    authService = new AuthenticationService(httpClientSpy as any);
  });

  it('should be created', () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(service).toBeTruthy();
  });

  describe('Login() ===>', () => {
    it('login should return user response value', (done: DoneFn) => {
      const expectedUserResponse: UserResponse = {
        account: {
          email: 'test@test.com',
          password: 'test123!@#',
          jwt: '1234567890'
        },
        message: 'Success',
        status: true
      };

      httpClientSpy.post.and.returnValue(asyncData(expectedUserResponse));

      authService.login({email: 'test@test.com', password: 'password'}).subscribe(
        userResponse => expect(userResponse)
        .toBe(expectedUserResponse, 'expected user response'), fail
      );

      expect(httpClientSpy.post.calls.count()).toBe(1, 'expect http post called');
      done();
    });

    it('login should return an error when call fails', (done: DoneFn) => {
      const errorResponse = throwError('test 401 unauthorized');

      httpClientSpy.post.and.returnValue(errorResponse);

      authService.login({email: 'fail@tail.com', password: 'fail'}).subscribe(
        userResponse => fail('expected an error, not user response'),
        error  => {
          expect(error).toContain('test 401 unauthorized');
        });
      done();
    });

  });

  describe('Create ===>', () => {
    it('Create should return user response request value', (done: DoneFn) => {
      const actualCreateUserRequest: CreateUserRequest = {
        email: 'test@test.com',
        password: 'test123!@#',
        firstName: 'John',
        lastName: 'Smith',
        mobileNumber: '5554443333',
        dateOfBirth: '11/10/1990',
        isMobile: true,
        isMobileValidated: true
      };

      const actualUserResponse: UserResponse = {
        account: {
          email: 'test@test.com',
          password: 'test123!@#',
          jwt: '1234567890'
        },
        message: 'Success',
        status: true
      };

      const expectedUserResponse: UserResponse = {
        account: {
          email: 'test@test.com',
          password: 'test123!@#',
          jwt: '1234567890'
        },
        message: 'Success',
        status: true
      };

      httpClientSpy.post.and.returnValue(asyncData(actualUserResponse));

      authService.create(actualCreateUserRequest).subscribe(
        userResponse => expect(userResponse)
        .toEqual(expectedUserResponse, 'expected user response'), fail
      );

      expect(httpClientSpy.post.calls.count()).toBe(1, 'http post to have been called');
      done();
    });

    it('create should return an error when call fails', (done: DoneFn) => {
      const errorResponse = throwError('test 400 bad request');
      httpClientSpy.post.and.returnValue(errorResponse);

      authService.login({email: 'test@test.com', password: 'password'}).subscribe(
        userResponse => fail('expected an error, bad request'),
        error => {
          console.log('ERROR: ', error);
          expect(error).toBe('test 400 bad request');
        });

      done();
    });

  });
});
