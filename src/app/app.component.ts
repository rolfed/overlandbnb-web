import { Component } from '@angular/core';
import { User } from './shared/model/user';
import { AuthenticationService } from './shared/service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ovb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public currentUser: User;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.authService.currentUser.subscribe(
      user => {
        console.log('USER on load: ', user);
        this.currentUser = user;
    });
  }
}
