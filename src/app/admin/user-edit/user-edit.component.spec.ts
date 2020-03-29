import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditComponent } from './user-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker/public_api';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/service/user.service';


describe('UserEditComponent', () => {
  let component: UserEditComponent;
  let fixture: ComponentFixture<UserEditComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockUserService: jasmine.SpyObj<UserService>;

  beforeEach(async(() => {
    mockRouter = jasmine.createSpyObj('Router', []);
    mockUserService = jasmine.createSpyObj('UserService', []);

    TestBed.configureTestingModule({
      declarations: [
        UserEditComponent
      ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        BsDatepickerModule.forRoot()
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: UserService, useValue: mockUserService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
