import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from "../service/authentication.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const currentUser = this.authService.currentUserValue;

    if (currentUser) {
      // user authenticated
      return true;
    }

    // user NOT authenticated
    this.router.navigate(['/'], {
      queryParams: {
        returnUrl: state.url
      }
    });

    return false;
  }
}
