import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { UserService } from "../shared/service/user.service";
import { first } from "rxjs/internal/operators/first";
import { User } from "../shared/model/user";

export interface UsersViewModel {
  user: User[]
}


@Component({
  selector: 'ovb-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public userIdFC: FormControl = new FormControl('', []);
  public userFG: FormGroup = new FormGroup({
    userID: this.userIdFC
  });
  public user: User;
  public users: User[]; 

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  public getUserById(id: string): void {
    this.userService.getUserById(id).pipe(
      first()
    ).subscribe( user => {
      console.log('USER: ', user);
      this.user = user;
    });
  } 

  public getAllUsers(): void {
    this.userService.getAll().subscribe(
      users => {
        if (!!users && !!users.account) {
          this.users = users.account;
          console.log('ALL USERS: ', this.users);
        }
      },
      error => {
        console.error('ERROR: ', error);
      }
    )
  }

}
