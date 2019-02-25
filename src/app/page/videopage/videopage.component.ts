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
        // per la gestione dell'invio di tuple al server
        let lw = JSON.parse(localStorage.getItem('lastWatched')).filter( a => a == params.videoId);
        if (lw.length) sessionStorage.setItem('lastVideo', params.videoId);

        this.ytService.getVideo(params.videoId).subscribe(
          (data: any) => {
            let a=data;
            console.log(a);
            data = this.ytService.filterVideo(data);
            if (data.items.length == 0){
              this.route.navigate(['404'], { replaceUrl: true, skipLocationChange: true });
            }
          },
          error => console.log(error)
        );
      }
    );   // TODO: remove this and html
  }
}
