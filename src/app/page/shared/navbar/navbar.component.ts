import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title: string;

  isCollapsed = true;

  by: string;
  q: string;

  constructor(
    private router: Router,
    private app: AppComponent
  ) { }

  ngOnInit() {
    this.title = this.app.appName;
    this.by = 'Title';
  }

  search(): void {
    var page: string;

    if (this.by == 'ID') page = '/videopage';
    else page = '/search';

    this.router.navigate([page, this.q]);
  }

}
