import { Injectable } from '@angular/core'
import { AuthenticationService } from '../service/authentication.service';
import { Observable, throwError } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { catchError } from "rxjs/internal/operators/catchError";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private readonly UNAUTHORIZED_STATUS = 401;

  constructor(
    private authService: AuthenticationService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === this.UNAUTHORIZED_STATUS) {
          // auto logout if 401 response return from api
          this.authService.logout();
          location.reload(true);
        } 

        return throwError(err.err.message || err.statusText)
      }))
  }
}
