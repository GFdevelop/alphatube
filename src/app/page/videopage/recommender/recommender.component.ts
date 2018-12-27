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
    private ytService: YoutubeService
  ) { }

  ngOnInit() {
    this.r10s = {};
    this.route.params.subscribe( params => {
      this.alphalistService.getAll().subscribe(
        (data: any) => {
          let videoList = [];
          while (videoList.length < this.nVideo) {
            let extracted = Math.floor(Math.random()*data.length);  // [0,1) * nElements --> rounded down
            if ((data[extracted].videoID !== params.videoId) &&     // check if isn't current videoID
                (videoList.indexOf(data[extracted]) === -1)) {      // check if is unique videoID in list
              videoList.push(data[extracted]);                      // if unique then push
            }
          }
          this.r10s['fvitali'] = videoList;
        },
        error => console.log(error)
      );

      this.ytService.getRecommenders({relatedToVideoId: params.videoId, maxResults: this.nVideo}).subscribe(
        (data: any) => this.r10s['related'] = this.fromYT(data),
        error => console.log(error)
      );

      if (localStorage.q) {
        this.ytService.getRecommenders({q: localStorage.q}).subscribe(
          (data: any) => this.r10s['search'] = this.fromYT(data).filter(obj => obj.videoID !== params.videoId),
          error => console.log(error)
        );
      }
    });
  }

  fromYT(data: any) {
    let results: {artist: string, title: string, videoID: string}[] = [];
    for (let i in data.items) {
      results.push(
        {
          artist: data.items[i].snippet.channelTitle,
          title: data.items[i].snippet.title,
          videoID: (data.items[i].id.videoId) ? data.items[i].id.videoId : data.items[i].id
        }
      );
    }
    return results;
  }
}
