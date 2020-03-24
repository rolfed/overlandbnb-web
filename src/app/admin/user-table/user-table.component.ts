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
  public temp = [];

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

  public updateSearch(event) {
    const val = event.target.value.toLowerCase();
    
    // filter our data
    const temp = this.temp.filter(function(d) {

    });
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
        phone: account.phone,
        isMobile: account.isMobile,
        isMobileVerified: account.isMobileVerified,
        role: account.role,
        address1: account.address1,
        adress2: account.address2,
        city: account.city,
        state: account.state,
        postalCode: account.postalCode,
        country: account.country,
        createdAt: account.createdAt,
        updatedAt: account.updatedAt
      };
      this.rows.push(value);
    });
  }

}
