import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLandingComponent } from './user-landing.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserLandingComponent', () => {
  let component: UserLandingComponent;
  let fixture: ComponentFixture<UserLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLandingComponent ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
