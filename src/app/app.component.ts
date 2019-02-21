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

  ngOnInit() {
    this.as.getId(localStorage.id).subscribe(
      (user: any) => localStorage.id = user.id,
      error => console.log('error getId')
    );
    this.as.update(localStorage.id,'J1JgxzX7irQ','related','48vsxX-oqog').subscribe(
      (res: any) => true,
      error => console.log(error)
    );
  }
}
