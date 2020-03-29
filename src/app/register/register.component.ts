import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/service/authentication.service';

export enum PasswordStrength {
  week = 'week',
  medium = 'medium',
  strong = 'strong'
}

export interface PasswordRequirement {
  minLength: boolean;
  capital: boolean;
  num: boolean;
  specialChar: boolean;
}

@Component({
  selector: 'ovb-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public isSubmitted = false;
  public isRegistrationSuccesful = false;
  public passwordStrength: string;
  public passwordReq: PasswordRequirement = {
    minLength: false,
    capital: false,
    num: false,
    specialChar: false
  };

  public firstNameFC: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z\s]*$')
  ]);
  public lastNameFC: FormControl = new FormControl('', [
    Validators.required
  ]);
  public dateOfBirthFC: FormControl = new FormControl('', [
    Validators.required
  ]);
  public emailFC: FormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  public mobileFC: FormControl = new FormControl('', [
    Validators.required,
    // TODO add phone pattern
    // Validators.pattern('/^[0-9]\d*$/')
  ]);
  public termsFC: FormControl = new FormControl('', [
    Validators.required
  ]);
  public passwordFC: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern(/^(?=.*[\w])(?=.*[\W])[\w\W]{6,}$/)
  ]);

  public isFormSubmitted = false;
  public registrationFG: FormGroup = new FormGroup({
    firstName: this.firstNameFC,
    lastName: this.lastNameFC,
    dateOfBirth: this.dateOfBirthFC,
    email: this.emailFC,
    mobile: this.mobileFC,
    acceptedTerms: this.termsFC,
    password: this.passwordFC
  });

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.validatePasswordStrenth();
  }

  // TODO This needs work
  public validatePasswordStrenth(): void {
    this.passwordFC.valueChanges.subscribe(
      value => {
        console.log('VALUE: ', value);

        // Reset if length is 0
        if (value.length === 0) {
          console.log('LENGTH 0');
          this.passwordReq.minLength = false;
          this.passwordReq.capital = false;
          this.passwordReq.num = false;
          this.passwordReq.specialChar = false;

        } else {
          // Min length six
          this.passwordReq.minLength = (value.length >= 6);

          // Contains Capital
          const capitalRegex = RegExp('[A-Z]');
          this.passwordReq.capital = capitalRegex.test(value);

          // Contains Number
          const numRegex = RegExp('[0-9]');
          this.passwordReq.num = numRegex.test(value);

          // Contains Special Chars
          const specialRegex = RegExp('[$#.%&*@!+-?]');
          this.passwordReq.specialChar = specialRegex.test(value);
        }

      });
  }

  public onSubmit() {
    this.isSubmitted = true;
    if (this.registrationFG.valid) {
      console.log('FORM VALUE', JSON.stringify(this.registrationFG.value, null, 2));

      this.authService.create(this.registrationFG.value).subscribe(
        resp => {
          console.log('RESPONSE: ', resp);
          if (resp.status) {
            this.isRegistrationSuccesful = false;
            this.router.navigate(['/']).then(r => r);
          }
        },
        error => {
          console.log('ERROR: ', error);
          this.isSubmitted = false;
        });
    }
  }
}
