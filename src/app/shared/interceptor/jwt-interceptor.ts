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
    if (currentUser &&  currentUser.jwt) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.jwt}`, 
          ContentType: 'application/json'
        }
      });
    }

    return next.handle(request);
  }
}
