import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { CreateUserRequest, UserCredential, UserResponse, Status, User, AccountResponse } from '../model/user';
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<AccountResponse>;
  public currentUser: Observable<AccountResponse>; 

  private readonly CURRENT_USER = 'currentUser';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<AccountResponse>(
      JSON.parse(localStorage.getItem(this.CURRENT_USER)));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): AccountResponse {
    return this.currentUserSubject.value;
  }

  /**
   * login method authenticates user
   *
   * 200 Ok - user authenticated
   * 401 Unauthorized - authentication failed
   * 500 Internal Server Error
   * @param credential email string, password string
   */
  public login(credential: UserCredential): Observable<AccountResponse> {
    return this.http.post<AccountResponse>(environment.accountLoginEndpoint, credential).pipe(
      map(user => {
        localStorage.setItem(this.CURRENT_USER, JSON.stringify(user));
        this.currentUserSubject.next(user); 
        return user;
      })
    );
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
  public create(user: CreateUserRequest): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<User>(environment.accountCreateEndpoint, user, httpOptions);
  }

  /*
   * Logout user
   */
  public logout(): void {
    // remove user from local storage to log user out
    localStorage.clear()
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }
}

