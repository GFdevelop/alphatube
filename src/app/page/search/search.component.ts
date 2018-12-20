import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { YoutubeService } from '../../services/youtube/youtube.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  message: string;
  searchResults: any;
  q: string;

  constructor(
    private route: ActivatedRoute,
    private yt: YoutubeService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((urlParams) => {
      this.message = (urlParams.pageToken) ? 'Next results of ' + urlParams.q : 'Search results for ' + urlParams.q;
      this.q = urlParams.q;
      if (localStorage.q !== urlParams.q) localStorage.q = urlParams.q;
      this.yt.getSearch(urlParams).subscribe(
        (data: any) => this.searchResults = data,
        error => {
          if (navigator.onLine === false) {
            console.error('No internet connection');
          }
        }
      );
    });
  }
}
