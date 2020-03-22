import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { User, AccountsResponse } from "../model/user";
import { environment } from "../../../environments/environment";

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
    return this.http.get<AccountsResponse>(`${environment.account}`)
  }

  public getUserById(userId: string): Observable<User> {
    const id = parseInt(userId)
    return this.http.get<User>(`${environment.account}/${id}`) }
}
