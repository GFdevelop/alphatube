import { Component, OnInit } from '@angular/core';

import { SearchService } from '../../../services/search/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title = 'alphatube';

  query: string;
  searchResults: string[];

  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }

  search(): void {
    this.searchService.getAll().subscribe(
      (data: any) => { this.searchResults = data; },
      error => console.log(error)
    );
  }

}
