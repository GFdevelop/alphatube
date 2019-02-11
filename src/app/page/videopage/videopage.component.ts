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
            //console.log(data);
            if (data.items.length == 0){

              this.route.navigate(['404']);
            }
          },
          error => console.log(error)
        );
      }
    );   // TODO: remove this and html
  }

  isViewable(data: any) {
    for (let i=0; i<data.items.length; i++){
      if ((data.items[i].status.publicStatsViewable == false) ||
      (data.items[i].status.embeddable == false)){
        data.items.splice(i,1);
        //i = i-1; ?
      }
    }
    return data;
  }

}
