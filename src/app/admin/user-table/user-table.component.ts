import { Component, OnInit, Input } from '@angular/core';
import { User } from "../../shared/model/user";
import { ColumnMode  } from '@swimlane/ngx-datatable';

@Component({
  selector: 'ovb-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  @Input() userData: User[];
  ColumnMode = ColumnMode;

  constructor() { }

  ngOnInit() {
    if (!!this.userData) {
      this.generateColumns(this.userData);
      this.generateRows(this.userData);
    }
  }
  
  /**
   * Generate column labels from account object
   */
  public columns = [];
  public generateColumns(userData: User[]) {
    console.log('CALL GENERATE COLUMNS');
    console.log('DATA: ', Object.keys(userData[0]));

    Object.keys(userData[0]).map(
      key => {
        const label = {name: key};
        this.columns.push(label)
      }
    )
  }


  /**
   * Generate row labels from account object
   */
  public rows = [];
  public generateRows(userData: User[]) {
    userData.map(account => {
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
      console.log('ACCOUNT: ', value);
      this.rows.push(value);
    });
  }

}
