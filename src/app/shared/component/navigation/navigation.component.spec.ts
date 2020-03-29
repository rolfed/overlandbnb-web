import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { NavigationComponent } from './navigation.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from '../../service/authentication.service';
import { of, throwError } from 'rxjs';
import { UserResponse, AccountResponse } from '../../model/user';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let stubAuthService: jasmine.SpyObj<AuthenticationService>;

  const mockUserResponse: AccountResponse = {
    account: {
      email: 'hello@test.com',
      // password: 'abc123!@#',
      jwt: '1234567890',
      status: true,
      message: ''
    },
    message: 'succes',
    status: true
  };

  const mockFailUserResponse: UserResponse = {
    account: {
      email: undefined,
      password: undefined,
      jwt: undefined
    },
    message: 'fail',
    status: false
  };

  beforeEach(() => {
    stubAuthService = jasmine.createSpyObj('AuthenticationService', ['login']);
    stubAuthService.login.and.returnValue(of( mockUserResponse));
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavigationComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        BsDropdownModule.forRoot()
      ],
      providers: [
        { provide: AuthenticationService, useValue: stubAuthService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('OnSubmit ===>', () => {
    it('Should create a user account on submit', (done: DoneFn) => {
      component.emailFC.setValue('fail@gmail.com');
      component.passwordFC.setValue('failPwTest');
      component.onSubmit();
      expect(component.isUserAuthenticated)
      .toBeTruthy('is user authentication is truthy');
      done();
    });

    it('should error when login fails', () => {
      component.emailFC.setValue('fail@gmail.com');
      component.passwordFC.setValue('failPwTest');
      stubAuthService.login.and.returnValue(
        throwError({error: {status: 400, message: 'login failed'}})
      );
      component.onSubmit();
      expect(component.hasAuthenticationFailed).toBeTruthy('authentication has failed');
      expect(component.errorMessage).toEqual('login failed');
    });

    it('Should set is user authenticated to false when call login fails', (done: DoneFn) => {
      stubAuthService.login.and.returnValue(throwError('Login fail'));
      expect(component.isUserAuthenticated)
        .toBeFalsy('is user authentication is falsy');
      done();
    });
  });

  describe('LoginFG ===> ', () => {
    it('SUCCESS: login form validators test', () => {
      component.emailFC.setValue('fail@gmail.com');
      component.passwordFC.setValue('failPwTest');
      expect(component.loginFG.valid).toBeTruthy('login form group values are valid');
    });

    it('FAIL: login form validators test', () => {
      component.emailFC.setValue('fail*gma');
      component.passwordFC.setValue('fail');
      expect(component.loginFG.valid).toBeFalsy('login form group values are not valid');
    });
  });

  describe('RxJs Timer ==> ', () => {
    it('should reset form validators', fakeAsync(() => {
      tick(0);
      component.onSubmit();
      expect(component.isSubmitted).toBeTruthy('isSubmitted to be truthy');

      tick(6000);
      expect(component.isSubmitted).toBeFalsy('isSubmitted to be falsy');
    }));

    // TODO fix test
    xit('should clear error message ', fakeAsync(() => {
      component.onSubmit();
      spyOn<any>(component, 'clearErrorMessage').and.callThrough();

      tick(0);
      expect(component.fadeOutRight).toBeFalsy('before is fadeOutRight');
      expect(component.fadeInRight).toBeFalsy('before is fadeInRight');
      expect(component.isSubmitted).toBeTruthy('before is isSubmitted');

      tick(5000);
      expect(component.fadeOutRight).toBeTruthy('before is fadeOutRight');

      tick(6000);
      expect(component.fadeInRight).toBeTruthy('before is fadeInRight');
      expect(component.isSubmitted).toBeFalsy('before is isSubmitted');
    }));
  });


});
