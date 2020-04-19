import { Component, OnInit, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QUERY_PARAMS, OBNB_ROUTES } from '../shared/constants/routing.constants';


@Component({
  selector: 'ovb-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnChanges {

  @ViewChild('searchInput', {static: true}) searchInput: ElementRef;
  public query: string;

  constructor(private router: Router,
              private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.initSearch();
  }

  ngOnChanges() {
    this.initSearch();
  }

  private initSearch(): void {
    const params = this.activeRoute.snapshot.queryParams;
    this.query = params[QUERY_PARAMS.QUERY];

    if (!!this.query) {
      // TODO: get the results from BE
      console.log('SEARCH FOR: ', this.query, this.searchInput);
      this.searchInput.nativeElement.value = this.query;

    } else {
      // TODO: Init without results
    }
  }

  public search(query: string): void {
    const params = { queryParams: {} };
    params.queryParams[QUERY_PARAMS.QUERY] = query;

    this.router.navigate([OBNB_ROUTES.SEARCH], params);
  }

}
