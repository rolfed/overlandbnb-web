import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthenticationService } from '../service/authentication.service';
import { Observable } from 'rxjs';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const currentUser = this.authService.currentUserValue;

    if (currentUser &&  currentUser.account.jwt) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.account.jwt}`,
          ContentType: 'application/json'
        }
      });
    }

    // TODO remove when done
    return next.handle(request);
  }
}
