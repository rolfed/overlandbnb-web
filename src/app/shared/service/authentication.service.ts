import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { CreateUserRequest, UserCredential, UserResponse, Status } from '../model/userResponse';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
  ) {}

  /**
   * login method authenticates user
   *
   * 200 Ok - user authenticated
   * 401 Unauthorized - authentication failed
   * 500 Internal Server Error
   * @param credential email string, password string
   */
  public login(credential: UserCredential): Observable<UserResponse> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<UserResponse>(environment.accountLoginEndpoint, credential, httpOptions);
  }

  /**
   * Create a new user account
   *
   * Create user account
   * 200 Ok
   * 400 Bad Request - insufficient data in the request body
   * 500 Internal Server Error
   * @param user details for registration
   */
  public create(user: CreateUserRequest): Observable<UserResponse> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post(environment.accountCreateEndpoint, user, httpOptions)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  /**
   * handleError method handles errors for http calls
   * @param response error from failed http request
   */
  private handleError = (response: HttpErrorResponse): Observable<any> => {
    console.error(response);
    return throwError(response.error || 'Server error');
  }
}

