import { Component, OnInit } from '@angular/core';

import { FvitaliService } from '../../services/fvitali/fvitali.service';
import { Video } from '../../services/fvitali/video';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  startingList: Array<Video>;
  
  constructor(private fvitaliService: FvitaliService) { }

  ngOnInit() {
    this.fvitaliService.getAll().subscribe(
      (data: any) => { this.startingList = data; },
      error => console.log(error)
    );
  }
}
