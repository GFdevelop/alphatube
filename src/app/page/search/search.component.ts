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
  q: string;
  semaphore = false;

  @ViewChild('list') list: ElementRef;

  constructor(private route: ActivatedRoute, private yt: YoutubeService) { }

  ngOnInit() {
    this.q = undefined;
    this.searchResults = undefined;

    this.route.params.subscribe((urlParams) => {
      if (localStorage.q !== urlParams.q) { localStorage.q = urlParams.q; }
      this.doSearch(urlParams.q);
    });
  }

  doSearch(q: string, pageToken?: string) {
    if (!this.semaphore) {
      this.semaphore = true;
      this.yt.getSearch(q, pageToken).toPromise().then(
        (data: any) => {
          if (this.q !== q) {
            this.searchResults = data;
            this.q = q;
          }
          else if (this.searchResults.nextPageToken) {
            this.searchResults.nextPageToken = data.nextPageToken;
            this.searchResults.items = this.searchResults.items.concat(data.items);
          }
          this.semaphore = false;
        },
        error => {
          window.alert('There is an error: please reload page!');
          this.semaphore = false;
        }
      );
    }
  }

  @HostListener('window:scroll', ['$event']) onWindowScroll() {
    if (this.searchResults && (this.searchResults.items.length > 3)) {
      if ((window.innerHeight + window.pageYOffset) >= this.list.nativeElement.children[this.searchResults.items.length - 3].offsetTop) {
        this.doSearch(this.q, this.searchResults.nextPageToken);
      }
    }
  }
}
