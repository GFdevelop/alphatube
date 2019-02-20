import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { YoutubeService } from '../../../services/youtube/youtube.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})

export class PlayerComponent implements OnInit {
    videoName: string;
    baseUrl = 'http://www.youtube.com/embed/';
    videoId: string;
    status: any;
    startTime: any;
    watchedTime: any;
    watched: any;

    constructor(
        private sanitizer: DomSanitizer,
        private route: ActivatedRoute,
        private videoInfo: YoutubeService
    ) {}

    ngOnInit() {
        this.route.params.subscribe( params => {
          this.startTime = 0;
          this.watchedTime = 0;
          this.watched = false;
          this.status = 5;
          this.videoId = params.videoId;

          // ~ this.recentVideoList(params);

          // ~ this.iframe.nativeElement.contentWindow.location.replace(this.baseUrl + params.videoId);

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
        }
        // ~ console.log(this.watchedTime);
      }
      this.startTime = playerTime;
    }

    // ~ recentVideoList(params: any) {
      // ~ let tmpList = [params.videoId];
      // ~ //dentro a lastWatched mettiamo le stringhe parsate in JSON degli id dei video visti
      // ~ let lastWatched = JSON.parse(localStorage.getItem('lastWatched'));
      // ~ //se lastWatched contiene qualcosa
      // ~ if (lastWatched){
      // ~ //scorro l'array di lastWatched finchè non arriva a 11 elementi
        // ~ for (let i = 0; i<lastWatched.length && i<11; i++){
        // ~ // se il video corrente non è presente in lastWatched, non lo metto perchè l'ho già
        // ~ //messo nella prima riga
        // ~ //e push in tmpList l'array di lastWatched
          // ~ if (params.videoId != lastWatched[i]) tmpList.push(lastWatched[i]);
        // ~ }
      // ~ }
      // ~ localStorage.setItem('lastWatched' , JSON.stringify(tmpList));
    // ~ }

    // ~ @ViewChild('iframe') iframe: ElementRef;
}
