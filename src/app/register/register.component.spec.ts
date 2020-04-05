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

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('===> togglePasswordField()', () => {
    it('should set the password field type to [text] when current type is [password]', () => {
      component.togglePasswordField(component.PASSWORD);
      expect(component.passwordFieldType).toEqual(component.TEXT);
    });

    it('should set the password field type to [password] when current type is [text]', () => {
      component.togglePasswordField(component.PASSWORD);
      expect(component.passwordFieldType).toEqual(component.TEXT);
    });
  });
});
