import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { User, AccountsResponse } from '../model/user';
import { environment } from '../../../environments/environment';
import { map } from "rxjs/internal/operators/map";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _userId: string;
  private _user: User;
  constructor(private http: HttpClient) { }

  get user() {
    return this._user;
  }

  set user(user: User) {
    this._user = user;
  }

  public getAll(): Observable<AccountsResponse> {
    return this.http.get<AccountsResponse>(`${environment.account}`).pipe(
      map(users => {
        console.log('USERS: ', users)
        return users;
      })
    );
  }

  public getUserById(userId: string): Observable<User> {
    const id = parseInt(userId);
    return this.http.get<User>(`${environment.account}/${id}`); 
  }

  public updateUserById(user: User): Observable<User> {
    return this.http.patch<User>(`${environment.account}/${user.userId}`, user);
  }
}
