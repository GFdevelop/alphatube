import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
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
  nVideo = 20;
  notFirst: string;

  constructor(
    private alphalistService: AlphalistService,
    private ytService: YoutubeService
  ) { }

  ngOnInit() {
    try {
      this.notFirst = JSON.parse(localStorage.getItem('lastWatched'))[0];
      //console.log(this.notFirst);
    }
    catch {
      this.notFirst = undefined;
    }

    this.alphalistService.getAll().subscribe(
      (data: any) => {
        let idList = [];
        while ((idList.length < 30) && (data.length)) {
        // prendo un indice a caso e tiro fuori l'id del video, e lo metto dentro a idlist,
          idList.push(data.splice(Math.floor(Math.random() * data.length), 1)[0].videoID);
        }
        //richiedo le informazioni yt dei vari video
        this.ytService.getVideo(idList.join()).subscribe(
        //che viene filtrato e messo nel formato
          (obj: any) => this.videos = this.ytService.fromYT(this.ytService.filterVideo(obj)).splice(0,this.nVideo),
          error => console.log(error)
        );
      },
      error => console.log(error)
    );
  }

}
