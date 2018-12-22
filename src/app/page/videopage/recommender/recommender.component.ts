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
  FVvideos: any;
  YTvideosCor: any;
  YTvideosQue: any;

  constructor(
    private alphalistService: AlphalistService,
    private route: ActivatedRoute,
    private youtubeService: YoutubeService
  ) { }

  ngOnInit() {
    this.alphalistService.getAll().subscribe(
      (data: any) => { this.FVvideos = data; },
      error => console.log(error)
    );
    this.route.params.subscribe( params => {
      this.youtubeService.getSearch({relatedToVideoId: params.videoId, maxResults: '11'}).subscribe(
        (data: any) => this.YTvideosCor = data.items,
        error => console.log(error)
      );
      this.youtubeService.getRecommenders({q: localStorage.q}).subscribe(
        (data: any) => this.YTvideosQue = data.filter(obj => obj.videoID !== params.videoId),
        error => console.log(error)
      );
    });
  }
}
