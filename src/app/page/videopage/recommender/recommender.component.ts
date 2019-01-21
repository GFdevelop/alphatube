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
          let idList = [];
          let cap = data.length;
          while ((idList.length < this.nVideo) && (idList.length < cap)){
            idList.push(data.splice(Math.floor(Math.random()*data.length),1)[0].videoID);
            //if (idList[idList.length-1] == "Xxi5CJo8UbM" || idList[idList.length-1] == "oOg5VxrRTi0") {idList.pop(); cap--;}
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
          (data: any) => this.r10s['search'] = this.fromYT(data).filter(obj => obj.videoID !== params.videoId),
          error => console.log(error)
        );
      }
    });
  }

  fromYT(data: any) {
    let results: {artist: string, title: string, videoID: string, img: string}[] = [];
    for (let i in data.items) {
      results.push(
        {
          artist: data.items[i].snippet.channelTitle,
          title: data.items[i].snippet.title,
          videoID: (data.items[i].id.videoId) ? data.items[i].id.videoId : data.items[i].id,
          img: data.items[i].snippet.thumbnails.medium.url
        }
      );
    }
    return results;
  }
}
