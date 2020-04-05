import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { UserEditComponent } from './user-edit.component';
import { UserService } from 'src/app/shared/service/user.service';


describe('UserEditComponent', () => {
  let component: UserEditComponent;
  let fixture: ComponentFixture<UserEditComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;

  const testRoutes: Routes = [
    { path: 'admin', component: UserEditComponent }
  ];

  beforeEach(async(() => {
    mockUserService = jasmine.createSpyObj(
      'UserService',
      ['getAll', 'getUserById', 'updateUserById']
    );

    TestBed.configureTestingModule({
      declarations: [
        UserEditComponent
      ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(testRoutes),
        BsDatepickerModule.forRoot()
      ],
      providers: [
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
