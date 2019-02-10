import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';   // TODO: remove this and html

import { YoutubeService } from '../../services/youtube/youtube.service';

@Component({
  selector: 'app-videopage',
  templateUrl: './videopage.component.html',
  styleUrls: ['./videopage.component.css']
})
export class VideopageComponent implements OnInit {

  constructor(
    private activeRoute: ActivatedRoute,
    private route: Router,
    private ytService: YoutubeService
  ) { }   // TODO: remove this and html

  ngOnInit() {
    this.activeRoute.params.subscribe(
      (params) => {
        this.ytService.getVideo(params.videoId).subscribe(
          (data: any) => {
            if (data.items.length == 0){this.route.navigate(['../404']);}
          },
          error => console.log(error)
        );
      }
    );   // TODO: remove this and html
  }

}
