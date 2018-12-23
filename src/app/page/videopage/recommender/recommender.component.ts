import { Component, OnInit, ViewEncapsulation, HostListener} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AlphalistService } from '../../../services/alphalist/alphalist.service';
import { YoutubeService } from '../../../services/youtube/youtube.service';

@Component({
  selector: 'app-recommender',
  templateUrl: './recommender.component.html',
  styleUrls: ['./recommender.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RecommenderComponent implements OnInit {
    videoBuffer: any;
    videoNameBuffer: any;
    YTvideosQue: any;

    constructor(
        private alphalistService: AlphalistService,
        private route: ActivatedRoute,
        private youtubeService: YoutubeService
    ) { }

    ngOnInit() {
        this.route.params.subscribe( params => {
            this.videoBuffer = [];
            this.videoNameBuffer = [];
            this.alphalistService.getAll().subscribe(
              (data: any) => {
                  var FVvideos = data;
                  for (var i = 0; i < 10; i++) {
                      var j = Math.floor(Math.random() * (FVvideos.length + 1));
                      var tmp = FVvideos[i];
                      FVvideos[i] = FVvideos[j];
                      FVvideos[j] = tmp;
                  }
                  this.videoBuffer.push(FVvideos);
                  this.videoNameBuffer.push('Fvitali');
              },
              error => console.log(error)
            );

            this.youtubeService.getSearch({relatedToVideoId: params.videoId, maxResults: '11'}).subscribe(
                (data: any) => {
                    var YTvideosCor = data.items;
                    this.videoBuffer.push(YTvideosCor);
                    this.videoNameBuffer.push('YouTube Recommender');
                },
                error => console.log(error)
            );
            this.youtubeService.getRecommenders({q: localStorage.q}).subscribe(
              (data: any) => {
                  var YTvideosQue = data.filter(obj => obj.videoID !== params.videoId)
                  console.log(this.YTvideosQue);
                  this.videoBuffer.push(YTvideosQue);
                  this.videoNameBuffer.push('YouTube Search');
              },
              error => console.log(error)
            );
        });
    }
}
