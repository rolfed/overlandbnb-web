import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { timer } from 'rxjs';
import { AuthenticationService } from '../../service/authentication.service';
import { User, Status } from '../../model/user';
import { first } from "rxjs/internal/operators/first";

@Component({
  selector: 'ovb-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @Input() user: User;

  public emailFC: FormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  public passwordFC: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);
  public loginFG: FormGroup = new FormGroup({
    email: this.emailFC,
    password: this.passwordFC
  });
  // public user: User;
  public isUserAuthenticated = false;
  public isSubmitted = false;
  public errorMessage: string;
  public hasAuthenticationFailed = false;
  public fadeInRight = false;
  public fadeOutRight = false;

  public SIGN_UP = '/register';

  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    if (!!this.user) {
      console.log('USER: ', this.user);
      this.isUserAuthenticated = true;
    }
  }

  public onSubmit() {
    // Submit attempt
    this.isSubmitted = true;
    this.fadeInRight = false;
    this.fadeOutRight = false;

    // Only make call if form group is valid
    if (this.loginFG.valid) {
      this.authService.login({email: this.emailFC.value, password: this.passwordFC.value})
      .pipe(first())
        .subscribe(userResponse => {
          this.user = userResponse;
          this.isUserAuthenticated = this.user.status;
        },
          error => {
            if (error.error) {
              this.errorMessage = error.error.message;
            }
            this.hasAuthenticationFailed = true;

            // Auth has failed animate error message
            this.fadeInRight = true;
            this.clearErrorMessage();
          });
    }

    this.resetFormValidation();
  }

  public logout(): void {
    console.log('LOG OUT');
    this.isUserAuthenticated = false;
    this.authService.logout();
  }

  private resetFormValidation() {
    // Reset form in 5 secounds
    timer(3000).subscribe( _ => {
      this.emailFC.clearValidators();
      this.passwordFC.clearValidators();
      this.isSubmitted = false;
    });
  }

  private clearErrorMessage() {
    // Form has been submitted and has failed
    // After 5 secounds animate error message out
    timer(5000).subscribe( _ => {
      this.fadeOutRight = true;
    });


    // Reset has auth failed
    timer(6000).subscribe( _ => {
      this.hasAuthenticationFailed = false;
      this.isSubmitted = false;
    });
  }

}
