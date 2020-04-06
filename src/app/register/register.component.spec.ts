import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BsDatepickerModule.forRoot()
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;

    spyOn(window.console, 'log').and.callFake(() => {});

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('===> validatePasswordStrength()', () => {
    const cases = [
      { input: '', expected: { minLength: false, capital: false, num: false, specialChar: false } },
      { input: 'paSsword123!', expected: { minLength: true, capital: true, num: true, specialChar: true } },
      { input: '123H!', expected: { minLength: false, capital: true, num: true, specialChar: true } },
      { input: 'password123!', expected: { minLength: true, capital: false, num: true, specialChar: true } },
      { input: 'paSsworD...', expected: { minLength: true, capital: true, num: false, specialChar: true } },
      { input: 'paSsword2', expected: { minLength: true, capital: true, num: true, specialChar: true } }, // TODO: fix this case
    ];

    cases.forEach(item => {
      it(`should show minLen:[${item.expected.minLength}], ` +
         `capital:[${item.expected.capital}], ` +
         `num:[${item.expected.num}], ` +
         `specChar:[${item.expected.specialChar}] ` +
         `when password=[${item.input}]`, () => {

        component.passwordFC.setValue('');
        fixture.detectChanges();
        component.passwordFC.setValue(item.input);
        fixture.detectChanges();

        expect(component.passwordReq).toEqual(item.expected, 'Output is not matching');
        expect(component.passwordReq.capital).toEqual(item.expected.capital, 'Capitalization Fail');
        expect(component.passwordReq.minLength).toEqual(item.expected.minLength, 'Min Len Fail');
        expect(component.passwordReq.num).toEqual(item.expected.num, 'Number Req Fail');
        expect(component.passwordReq.specialChar).toEqual(item.expected.specialChar, 'Special Char Fail');

      });
    });
  });

  describe('===> togglePasswordField()', () => {
    it('should set the password field type to [text] when current type is [password]', () => {
      component.togglePasswordField(component.PASSWORD);
      expect(component.passwordFieldType).toEqual(component.TEXT);
    });

    it('should set the password field type to [password] when current type is [text]', () => {
      component.togglePasswordField(component.TEXT);
      expect(component.passwordFieldType).toEqual(component.PASSWORD);
    });
  });
});
