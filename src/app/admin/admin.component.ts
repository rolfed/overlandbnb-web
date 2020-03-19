import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { UserService } from "../shared/service/user.service";
import { first } from "rxjs/internal/operators/first";

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
  public isLoading = false;
  public user: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  public getUserById(id: string) {
    console.log('USER ID: ', id)
    this.userService.getUserById(id).pipe(
      first()
    ).subscribe( user => {
      console.log('USER: ', user);
      this.user = user;
      this.isLoading = false;
    });
  } 

}
