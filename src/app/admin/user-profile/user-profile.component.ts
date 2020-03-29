import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../shared/service/user.service';
import { User } from '../../shared/model/user';


@Component({
  selector: 'ovb-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public user: User;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!!this.userService.user
      && Array.isArray(this.userService.user)
      && !!this.userService.user[0]) {
      this.user = this.userService.user[0];
    } else {
      this.router.navigate(['/admin']).then(v => v);
    }
  }

  public editUser(): void {
    const userDetail = {
      queryParams: { userId: this.user.userId  },
    };
    this.router.navigate(['/admin/edit'], userDetail).then(v => v);
  }
}
