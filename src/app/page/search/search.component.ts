import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
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
  semaphore = false;

  constructor(private route: ActivatedRoute, private yt: YoutubeService) { }

  ngOnInit() {
    this.route.params.subscribe((urlParams) => {
      this.semaphore = true;
      if (localStorage.q !== urlParams.q) { localStorage.q = urlParams.q; }
      this.message = 'Search results for ' + urlParams.q;
      this.doSearch(urlParams.q);
    });
  }

  // https://coryrylan.com/blog/rxjs-observables-versus-subjects
  doSearch(q: string, pageToken?: string) {
    this.yt.getSearch(q, pageToken).subscribe(
      (data: any) => {
        if (this.q !== q) {
          this.searchResults = data;
          this.q = q;
        } else {
          this.searchResults.nextPageToken = data.nextPageToken;
          this.searchResults.items = this.searchResults.items.concat(data.items);
        }
        this.semaphore = false;
      },
      error => {
        if (navigator.onLine === false) { console.error('No internet connection'); }
      }
    );
  }

  @ViewChild('list') list: ElementRef;

  @HostListener('window:scroll', ['$event']) onWindowScroll() {
    if (this.searchResults) {
      if ((window.innerHeight + window.scrollY) >= this.list.nativeElement.children[this.searchResults.items.length - 3].offsetTop) {
        if (this.q && !this.semaphore) {
          this.semaphore = true;
          this.doSearch(this.q, this.searchResults.nextPageToken);
        }
      }
    }
  }
}
