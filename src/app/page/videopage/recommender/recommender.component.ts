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
    show: boolean = true;
    videoBuffer: any = ['inizialization'];
    videoNameBuffer: any = ['inizialization'];
    YTvideosQue: any;

    query: any = 'test'; // TODO: da eliminare

    constructor(
        private alphalistService: AlphalistService,
        private route: ActivatedRoute,
        private youtubeService: YoutubeService
    ) { }

    ngOnInit() {
        this.videoBuffer.pop();
        this.videoNameBuffer.pop();
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
        this.route.params.subscribe( params => {
            this.youtubeService.getSearch({relatedToVideoId: params.videoId, maxResults: '11'}).subscribe(
                (data: any) => {
                    var YTvideosCor = data.items;
                    this.videoBuffer.push(YTvideosCor);
                    this.videoNameBuffer.push('YouTube');
                },
                error => console.log(error)
            );
            this.youtubeService.getSearch({q: this.query, maxResults: '11'}).subscribe(
                (data: any) => {console.log(data.items);this.YTvideosQue = data.items;},
                error => console.log(error)
            );
        });
    }
}
