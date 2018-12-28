import { Component, OnInit, ViewEncapsulation, HostListener} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// ~ import { of } from 'rxjs';

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
  r10s: any;
    // ~ random: any[],
    // ~ search: any[],
    // ~ related: any[],
    // ~ recent: any[],
    // ~ fvitali: any[],
    // ~ popularity: any[],
    // ~ similarity: any[]

  constructor(
    private alphalistService: AlphalistService,
    private route: ActivatedRoute,
    private ytService: YoutubeService
  ) { }

  ngOnInit() {
    this.r10s = {};
    this.route.params.subscribe( params => {

      // TODO: use this in homepage????

      // ~ this.alphalistService.getAll().subscribe(
        // ~ (data: any) => {
          // ~ let idList = [];
          // ~ while (idList.length < this.nVideo) {
            // ~ let extracted = Math.floor(Math.random()*data.length);      // [0,1) * nElements --> rounded down
            // ~ if ((data[extracted].videoID !== params.videoId) &&         // check if isn't current videoID
                // ~ (idList.indexOf(data[extracted].videoID) === -1)) {     // check if is unique videoID in list
              // ~ idList.push(data[extracted].videoID);                     // if unique then push
            // ~ }
          // ~ }
          // ~ this.ytService.getVideo(idList.join()).subscribe(             // joins all the elements of an array into a string
            // ~ (obj: any) => this.r10s['catalog'] = this.fromYT(obj),
            // ~ error => console.log(error)
          // ~ );
        // ~ },
        // ~ error => console.log(error)
      // ~ );

      // TODO: recommended reason?
      this.alphalistService.getRelatedTo(params.videoId).subscribe(
        (data: any) => {
          const idList = [];
          for (const item of data.recommended) {
            if (item.videoID !== params.videoId) { idList.push(item.videoID); }
          }
          this.ytService.getVideo(idList.join()).subscribe(             // joins all the elements of an array into a string
            (obj: any) => this.r10s['fvitali'] = this.fromYT(obj),
            error => console.log(error)
          );
        },
        error => console.log(error)
      );

      this.ytService.getRecommenders({relatedToVideoId: params.videoId, maxResults: this.nVideo}).subscribe(
        (data: any) => this.r10s['related'] = this.fromYT(data),
        error => console.log(error)
      );

      if (localStorage.q) {
        this.ytService.getRecommenders({q: localStorage.q}).subscribe(
          (data: any) => this.r10s['search'] = this.fromYT(data).filter(
            obj => obj.videoID !== params.videoId
          ),
          error => console.log(error)
        );
      }
    });
  }

  fromYT(data: any) {
    const results = [];
    for (const item of data.items) {
      results.push(
        {
          artist: item.snippet.channelTitle,
          title: item.snippet.title,
          videoID: (item.id.videoId) ? item.id.videoId : item.id,
          img: item.snippet.thumbnails.medium.url
        }
      );
    }
    return results;
  }
}
