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

  nVideo = 12;
  r10s: {
    // ~ random: any[],
    // ~ search: any[],
    // ~ related: any[],
    // ~ recent: any[],
    // ~ fvitali: any[],
    // ~ popularity: any[],
    // ~ similarity: any[]
  };

  constructor(
    private alphalistService: AlphalistService,
    private route: ActivatedRoute,
    private youtubeService: YoutubeService
  ) { }

  ngOnInit() {
    this.r10s = {};
    this.route.params.subscribe( params => {
      this.alphalistService.getAll().subscribe(
        (data: any) => {
          let idList = '';
          for (let i=0; i<this.nVideo; i=i+1) { // TODO: random i
            idList = idList.concat(data[i].videoID + ',');
          }
          this.youtubeService.getVideo(idList).subscribe(
            (obj: any) => this.r10s['fvitali'] = this.fromYT(obj).filter(video => video.videoID !== params.videoId),
            error => console.log(error)
          );
        },
        error => console.log(error)
      );
      this.youtubeService.getSearch({relatedToVideoId: params.videoId, maxResults: this.nVideo}).subscribe(
        (data: any) => this.r10s['related'] = this.fromYT(data),
        error => console.log(error)
      );
      this.youtubeService.getRecommenders({q: localStorage.q}).subscribe(
        (data: any) => this.r10s['search'] = this.fromYT(data).filter(obj => obj.videoID !== params.videoId),
        error => console.log(error)
      );
    });
    // ~ console.log(this.r10s);
  }

  fromYT(data: any) {
    let results: {artist: string, title: string, videoID: string, img: string}[] = [];
    for (let i in data.items) {
      results.push(
        {
          artist: data.items[i].snippet.channelTitle,
          title: data.items[i].snippet.title,
          videoID: data.items[i].id.videoId,
          img: data.items[i].snippet.thumbnails.medium.url
        }
      );
    }
    return results;
  }
}
