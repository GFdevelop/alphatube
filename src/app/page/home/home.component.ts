import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';   // TODO: remove this and html
import { AlphalistService } from '../../services/alphalist/alphalist.service';
import { YoutubeService } from '../../services/youtube/youtube.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  videoId: string;
  videos: any;
  nVideo= 20;

  constructor(private alphalistService: AlphalistService, private ytService: YoutubeService) { }

  ngOnInit() {
    this.alphalistService.getAll().subscribe(
      (data: any) => {
        let list = [];
        let cap = data.length;
        while ((list.length < this.nVideo + 5) &&(list.length < cap)){
          list.push(data.splice(Math.floor(Math.random()*data.length),1)[0].videoID);
        }
        this.ytService.getVideo(list.join()).subscribe(             // joins all the elements of an array into a string
          (obj: any) => this.videos = this.fromYT(obj).splice(0,20),
          error => console.log(error)
        );
      },
      error => console.log(error)
    );
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
