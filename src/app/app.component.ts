import { Component, OnInit } from '@angular/core';

import { AtlasService } from './services/atlas/atlas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  appName = 'alphatube';

  constructor (private as: AtlasService) { }

  ngOnInit() { }
}
