import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { User } from "../model/user";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userId: string;
  constructor(private http: HttpClient) { }

  public getAll(): Observable<Array<User>> {
    return this.http.get<User[]>(`${environment.account}`)
  }

  public getUserById(userId: string): Observable<User> {
    const id = parseInt(userId)
    return this.http.get<User>(`${environment.account}/${id}`) }
}
