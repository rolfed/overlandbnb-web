import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QUERY_PARAMS } from '../shared/constants/routing.constants';


@Component({
  selector: 'ovb-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public query: string;

  constructor(private router: Router,
              private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.initSearch();
  }

  private initSearch(): void {
    const params = this.activeRoute.snapshot.queryParams;
    this.query = params[QUERY_PARAMS.QUERY];

    if (!!this.query) {
      // TODO: get the results from BE
      console.log('SEARCH FOR: ', this.query);
    } else {
      // TODO: Init without results
    }
  }

}
