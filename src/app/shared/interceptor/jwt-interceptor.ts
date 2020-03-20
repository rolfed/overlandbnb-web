import { Injectable } from '@angular/core'
import { AuthenticationService } from '../service/authentication.service';
import { Observable } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let currentUser = this.authService.currentUserValue;
    console.log('JWT INT CURRENT USER: ', currentUser);


    if (currentUser &&  currentUser.account.jwt) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.account.jwt}`, 
          ContentType: 'application/json'
        }
      });
    }

    // TODO remove when done
    console.log('REQUEST: ', request);
    return next.handle(request);
  }
}
