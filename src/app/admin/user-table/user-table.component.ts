import { Component, OnInit, Input } from '@angular/core';
import { User, AccountsResponse } from "../../shared/model/user";
import { ColumnMode, SelectionType  } from '@swimlane/ngx-datatable';
import { Router } from "@angular/router";
import { UserService } from "../../shared/service/user.service";

@Component({
  selector: 'ovb-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  @Input() userData: AccountsResponse;
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  public columns = [];
  public rows = [];
  public selected = [];

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    console.log('Acccounts: ', this.userData);
    if (!!this.userData) {
      this.generateColumns(this.userData);
      this.generateRows(this.userData);
    }
  }

  public onSelect({ selected }) {
    this.userService.user = this.selected as any;

    let userDetail = {
      queryParams: { 'userId': this.selected[0].userId }
    };

    this.router.navigate(['/admin/user'], userDetail);
  }

  public onActivate(event) {
    console.log('Activated Event ', event);
  }
  
  /**
   * Generate column labels from account object
   */
  private generateColumns(userData: AccountsResponse) {
    Object.keys(userData.accounts[0]).map(
      key => {
        const label = {name: key};
        this.columns.push(label)
      }
    )
  }


  /**
   * Generate row labels from account object
   */
  private generateRows(userData: AccountsResponse) {
    userData.accounts.map(account => {
      const value = {
        userId: account.userId,
        email: account.email,
        firstName: account.firstName,
        lastName: account.lastName,
        dateOfBirth: account.dateOfBirth,
        isMobile: account.isMobile,
        isMobileVerified: account.isMobileVerified,
        permission: account.permission,
        createdAt: account.createdAt
      };
      this.rows.push(value);
    });
  }

}
