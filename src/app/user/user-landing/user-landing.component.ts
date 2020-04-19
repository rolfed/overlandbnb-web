import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OBNB_ROUTES, QUERY_PARAMS } from 'src/app/shared/constants/routing.constants';


@Component({
  selector: 'ovb-user-landing',
  templateUrl: './user-landing.component.html',
  styleUrls: ['./user-landing.component.scss']
})
export class UserLandingComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public search(qryString: string): void {
    const params = { queryParams: {} };
    params.queryParams[QUERY_PARAMS.QUERY] = qryString;

    this.router.navigate([OBNB_ROUTES.SEARCH], params);
  }

}
