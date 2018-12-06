import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//~ import { Router, NavigationExtras } from '@angular/router';

import { SearchService } from '../../shared/search/search.service';

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
    //~ private router: Router
  ) { }

  ngOnInit() {
	this.route.params.subscribe((params) => {
      this.searchService.getAll(params.q).subscribe(
        (data: any) => {
          this.searchResults = data;
          //~ if (this.searchResults.items[0].id.videoId == params.q) this.searchResults.items.splice(1, 11);
          console.log(this.searchResults);
          //~ this.router.navigate(['/videopage', params.q]);
        },
        error => console.log(error)
        );
    });
  }

}
