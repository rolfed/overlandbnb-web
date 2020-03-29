import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from '../../shared/service/user.service';
import { User } from '../../shared/model/user';


@Component({
  selector: 'ovb-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  public user: User;
  public isSubmitted: boolean;

  public userIdFC: FormControl = new FormControl((this.user && this.user.userId ? this.user.userId : ''), []);
  public emailFC: FormControl = new FormControl('', []);
  public firstNameFC: FormControl = new FormControl('', []);
  public lastNameFC: FormControl = new FormControl('', []);
  public dateOfBirthFC: FormControl = new FormControl('', []);
  public phoneFC: FormControl = new FormControl('', []);
  public address1FC: FormControl = new FormControl('', []);
  public address2FC: FormControl = new FormControl('', []);
  public cityFC: FormControl = new FormControl('', []);
  public stateFC: FormControl = new FormControl('', []);
  public postalCodeFC: FormControl = new FormControl('', []);
  public countryFC: FormControl = new FormControl('', []);
  public updateAt: FormControl = new FormControl(new Date().toISOString(), []);
  public isMobileFC: FormControl = new FormControl('', []);

  public userEditFG: FormGroup = new FormGroup({
    userId: this.userIdFC, 
    email: this.emailFC,
    firstName: this.firstNameFC,
    lastName: this.lastNameFC,
    dateOfBirth: this.dateOfBirthFC,
    phone: this.phoneFC,
    isMobile: this.isMobileFC,
    address1: this.address1FC,
    address2: this.address2FC,
    city: this.cityFC,
    state: this.stateFC,
    postalCode: this.postalCodeFC,
    country: this.countryFC,
    updateAt: this.updateAt
  });

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!!this.userService.user) {
      this.user = this.userService.user[0];
      this.userEditFG.patchValue(this.user);
      this.userIdFC.setValue(this.user.userId);
    } else {
      this.router.navigate(['/admin']).then(v => v);
    }
  }

  public onSubmit() {
    this.isSubmitted = true;
    if (this.userEditFG.valid) {
      this.userService.updateUserById(this.userEditFG.value).subscribe(
        response => {
          // Convert date of birth value to UTC
          const utcDate = this.dateOfBirthFC.value.toISOString();
          this.userEditFG.get('dateOfBirth').setValue(utcDate);
          this.router.navigate(['/admin']);

          // TODO remove when done
          console.log('RESPONSE: ', response);
        },
        err => {
          this.isSubmitted = false;
          console.error('ERROR: ', err.message);
        });
    }
  }


}
