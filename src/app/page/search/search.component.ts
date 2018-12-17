import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { YoutubeService } from '../../services/youtube/youtube.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchResults: any;
  params: any;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private yt: YoutubeService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((urlParams) => {
      this.searchResults = null;
      this.params = {q: urlParams.q};
      this.search(this.params);
    });
  }

  search(opt: any) {
    this.yt.getSearch(opt).subscribe(
      (data: any) => {
        if (this.searchResults) {
          this.searchResults.nextPageToken = data.nextPageToken;
          this.searchResults.items = this.searchResults.items.concat(data.items);
        } else {
          this.searchResults = data;
        }
        this.loading = false;
      },
      error => console.log(error)
    );
  }

  @ViewChild('list') list: ElementRef;

  @HostListener('window:scroll', ['$event']) onWindowScroll() {
    if (this.searchResults.nextPageToken) {
      if ((window.innerHeight + window.scrollY) >= this.list.nativeElement.children[this.searchResults.items.length - 3].offsetTop) {  // visible height + pixel scrolled >= total height
        if (this.loading == false) {
          this.loading = true;
        this.params = {...this.params, ...{pageToken: this.searchResults.nextPageToken} };
        this.search(this.params);
    // ~ console.log(this.list.nativeElement.children[this.searchResults.items.length - 3].offsetTop);
  }
      }
    }
  }
}
