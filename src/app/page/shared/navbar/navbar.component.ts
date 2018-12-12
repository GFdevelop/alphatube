import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    const page = (this.by === 'ID') ? '/videopage' : '/search';
    this.router.navigate([page, this.q]);
  }

}
