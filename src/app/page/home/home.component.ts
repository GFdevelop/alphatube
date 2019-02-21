import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AlphalistService } from '../../services/alphalist/alphalist.service';
import { YoutubeService } from '../../services/youtube/youtube.service';
/* import { MErrorComponent } from '../shared/m-error/m-error.component';*/

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  videoId: string;
  videos: any;
  nVideo = 20;

  constructor(
    private alphalistService: AlphalistService,
    private ytService: YoutubeService
    /* private ac: MErrorComponent,
    private fa: MErrorComponent,*/
  ) { }

  ngOnInit() {
  //  this.fa.ForceAngles();

    /*this.ac.setError();*/
    /*this.ac.getError();*/

    this.alphalistService.getAll().subscribe(
      (data: any) => {
        let idList = [];
        let cap = data.length;
        while ((idList.length < this.nVideo + 5) && (idList.length < cap)) {
          idList.push(data.splice(Math.floor(Math.random() * data.length), 1)[0].videoID); // pop out videos from data and added on the random idList
        }
        this.ytService.getVideo(idList.join()).subscribe( // joins all the elements of an array into a string
          (obj: any) => this.videos = this.fromYT(obj).splice(0, this.nVideo),
          error => console.log(error)
        );
      },
      error => console.log(error)
    );
  }

  fromYT(data: any) {
    let results: {artist: string, title: string, videoID: string, img: string, reason: string}[] = [];
    for (let i in data.items) {
      if ((!data.items.status) || (!data.items[i].status.publicStatsViewable && !data.items[i].status.embeddable)) {
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
    }
    return results;
  }

}
