import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title = 'alphatube';

  isCollapsed = true;

  types = [
    { parameter: 'byTitle', label: 'Title' },
    { parameter: 'byID', label: 'Youtube ID' }
  ];

  by: string;
  q: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.by = this.types[0].parameter;
  }

  search(): void {
    var page: string;

    if (this.by == 'byID') page = '/videopage';
    else page = '/search';

    this.router.navigate([page, this.q]);
  }

}
