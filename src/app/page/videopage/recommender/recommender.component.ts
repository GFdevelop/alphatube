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
    //~ []    random: any[],
    //~ [x]   search: any[],
    //~ [x]   related: any[],
    //~ []    recent: any[],
    //~ [x]   fvitali: any[],
    //~ []    popularity: any[],
    //~ []    similarity: any[]
  };

  constructor(
    private alphalistService: AlphalistService,
    private route: ActivatedRoute,
    private ytService: YoutubeService
  ) { }

  ngOnInit() {
    this.r10s = {};
    this.route.params.subscribe( params => {
      //random video
      this.alphalistService.getCatalog().subscribe(// TODO: test it
        (data: any) => {
          let idList = [];
          while (data.videos.length != 0 && idList.length < nVideo) {
            idList.push(data.videos.splice(Math.floor(Math.random()*data.videos.length),1)[0].videoId);
          }
          this.ytService.getVideo(idList.join()).subscribe(
            (obj: any) => this.r10s['random'].push(this.fromYT(obj)),
            error => console.log(error)
          )

        },
        error => console.log(error)


      )

      this.ytService.getRecommenders({}).subscribe(
      (data: any) => this.r10s['search'] = this.fromYT(data).filter(obj => obj.videoID !== params.videoId),
      error => console.log(error)
        /*(data: any) => console.log(data),
        error => console.log(error)*/
      );



      // search
      if (localStorage.q) {
        this.ytService.getRecommenders({q: localStorage.q}).subscribe(
          (data: any) => this.r10s['search'] = this.fromYT(data).filter(obj => obj.videoID !== params.videoId),
          error => console.log(error)
        );
      }

      // related
      this.ytService.getRecommenders({relatedToVideoId: params.videoId, maxResults: this.nVideo}).subscribe(
        (data: any) => this.r10s['YT related'] = this.fromYT(data),
        error => console.log(error)
      );

      // fvitali
      this.alphalistService.getGlobpop(params.videoId).subscribe(
        (data: any) => {
          let idList = [];
          data.recommended.forEach( function (value, index) {idList[index]=data.recommended[index].videoID;});
          this.ytService.getVideo(idList.join()).subscribe( // joins all the elements of an array into a string
            (obj: any) => {
              let tmpList = this.fromYT(obj);
              for (let i in tmpList){
                tmpList[i].reason =
                data.recommended.filter(
                  function match(element){
                    return element.videoID == tmpList[i].videoID;
                  }
                )[0].prevalentReason;
              }
              this.r10s['fvitali'] = tmpList;
            },
            error => console.log(error)
          );
        },
        error => console.log(error)
      );
    });
  }

  fromYT(data: any) {
    let results: {artist: string, title: string, videoID: string, img: string, reason: string}[] = [];
    for (let i in data.items) {
      results.push(
        {
          artist: data.items[i].snippet.channelTitle,
          title: data.items[i].snippet.title,
          videoID: (data.items[i].id.videoId) ? data.items[i].id.videoId : data.items[i].id,
          img: data.items[i].snippet.thumbnails.medium.url,
          reason: ''
        }
      );
    }
    return results;
  }
}
