import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "../../shared/service/user.service";
import { Router } from "@angular/router";
import { User } from "../../shared/model/user";

@Component({
  selector: 'ovb-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  public user: User;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!!this.userService.user) {
      this.user = this.userService.user[0];
      console.log('EDIT USER -- USER: ', this.user);
      this.userEditFG.patchValue(this.user);
    } else {
      this.router.navigate(['/admin']).then(v => v);
    }
  }

  public emailFC: FormControl = new FormControl(
    '', [Validators.required]);

  public firstNameFC: FormControl = new FormControl(
    '', [Validators.required]);

  public lastNameFC: FormControl = new FormControl(
    '', [Validators.required]);

  public dateOfBirthFC: FormControl = new FormControl(
    '', [Validators.required]);

  public phoneFC: FormControl = new FormControl(
    '', [Validators.required]);

  public address1FC: FormControl = new FormControl(
    '', [Validators.required]);

  public address2FC: FormControl = new FormControl('', []);

  public cityFC: FormControl = new FormControl(
    '', [Validators.required]);

  public stateFC: FormControl = new FormControl(
    '', [Validators.required]);

  public postalCodeFC: FormControl = new FormControl(
    '', [Validators.required]);

  public countryFC: FormControl = new FormControl(
    '', [Validators.required]);

  public updateAt: FormControl = new FormControl(
    new Date().toISOString(), []);

  public userEditFG: FormGroup = new FormGroup({
    email: this.emailFC,
    firstName: this.firstNameFC,
    lastName: this.lastNameFC,
    dateOfBirth: this.dateOfBirthFC,
    phone: this.phoneFC,
    address1: this.address1FC,
    address2: this.address2FC,
    city: this.cityFC,
    state: this.stateFC,
    postalCode: this.postalCodeFC,
    country: this.countryFC, 
    updateAt: this.updateAt 
  });

  public onSubmit() {
    if (this.userEditFG.valid) {
      this.userService.updateUserById(this.user).subscribe(
        response => {
        }, err => {
          console.error('ERROR: ', error);
        }
      )
    }
  }
}
