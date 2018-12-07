import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SearchService } from '../../services/search/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchResults: any;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.searchService.getSearch(params.q).subscribe(
        (data: any) => {
          this.searchResults = data;
          //~ console.log(this.searchResults);
        },
        error => console.log(error)
        );
    });
  }

}
