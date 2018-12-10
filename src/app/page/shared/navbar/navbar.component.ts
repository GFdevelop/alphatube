import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title = 'alphatube';  // TODO: use global variable

  isCollapsed = true;

  by: string;
  q: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.by = 'Title';
  }

  search(): void {
    var page: string;

    if (this.by == 'ID') page = '/videopage';
    else page = '/search';

    this.router.navigate([page, this.q]);
  }

}
