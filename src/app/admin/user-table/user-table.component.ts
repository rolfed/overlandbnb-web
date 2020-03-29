import { Component, OnInit, Input } from '@angular/core';
import { AccountsResponse } from '../../shared/model/user';
import { ColumnMode, SelectionType  } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { UserService } from '../../shared/service/user.service';


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
      this._generateColumns(this.userData);
      this._generateRows(this.userData);
    }
  }

  public onSelect({ selected }) {
    this.userService.user = this.selected as any;

    const userDetail = {
      queryParams: { userId: this.selected[0].userId }
    };

    this.router.navigate(['/admin/user'], userDetail);
  }

  public onActivate(event) {
    console.log('Activated Event ', event);
  }

  public updateSearch(event) {
    const val = event.target.value.toLowerCase();

    // TODO: filter our data
    // const temp = this.temp.filter((d) => { });
  }

  /**
   * Generate column labels from account object
   */
  private _generateColumns(userData: AccountsResponse) {
    Object.keys(userData.accounts[0]).map(
      key => {
        const label = {name: key};
        this.columns.push(label);
      }
    );
  }


  /**
   * Populate rows with data 
   */
  private _generateRows(userData: AccountsResponse) {
    userData.accounts.map(account => {
      this.rows.push(account);
    });
  }

}
