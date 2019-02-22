import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { YoutubeService } from '../../../services/youtube/youtube.service';
import { AtlasService } from '../../../services/atlas/atlas.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})

export class PlayerComponent implements OnInit {
    videoName: string;
    baseUrl = 'http://www.youtube.com/embed/';
    videoId: string;
    reason: string;
    status: any;
    startTime: any;
    watchedTime: any;
    watched: any;

    constructor(
        private route: ActivatedRoute,
        private videoInfo: YoutubeService,
        private as: AtlasService
    ) {}

    ngOnInit() {
        this.route.params.subscribe( params => {
          this.startTime = 0;
          this.watchedTime = 0;
          this.watched = false;
          this.status = 5;
          this.videoId = params.videoId;
          try { this.reason = params.reason;}
          catch { this.reason = '';}


          this.videoInfo.getVideo(params.videoId).subscribe(
              (data: any) => this.videoName = data.items[0].snippet.title
          );
        });
    }

    onStateChange(event) {
      this.status = event.data;
    }

    updateCurrentTime(playerTime) {
      if (this.status === 1) {
        this.watchedTime = this.watchedTime + (playerTime - this.startTime);
        if ((!this.watched) && (this.watchedTime >= 15)) {
          this.watched = true;
          console.log('watched!');

          // Aggiunge il video alla lista dei recenti
          this.recentVideoList(this.videoId);

          // Invia al server i dati da aggiungere al server
          this.as.sendWatched(this.videoId,this.reason).subscribe(
            (data: any) => console.log(data),
            error => console.log(error)
          );
        }
        // ~ console.log(this.watchedTime);
      }
      this.startTime = playerTime;
    }

    recentVideoList(videoID: string) {
      let tmpList = [videoID];
      //dentro a lastWatched mettiamo le stringhe parsate in JSON degli id dei video visti
      let lastWatched = JSON.parse(localStorage.getItem('lastWatched'));
      //se lastWatched contiene qualcosa
      if (lastWatched){
      //scorro l'array di lastWatched finchè non arriva a 11 elementi
        for (let i = 0; i<lastWatched.length && i<11; i++){
        // se il video corrente non è presente in lastWatched, non lo metto perchè l'ho già
        //messo nella prima riga
        //e push in tmpList l'array di lastWatched
          if (videoID != lastWatched[i]) tmpList.push(lastWatched[i]);
        }
      }
      localStorage.setItem('lastWatched' , JSON.stringify(tmpList));
    }
}
