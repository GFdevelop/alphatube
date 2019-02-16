import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

    constructor(
        private sanitizer: DomSanitizer,
        private route: ActivatedRoute,
        private videoInfo: YoutubeService
    ) {}

    ngOnInit() {
        this.route.params.subscribe( params => {
          this.recentVideoList(params);

          this.iframe.nativeElement.contentWindow.location.replace(this.baseUrl + params.videoId);

          this.videoInfo.getVideo(params.videoId).subscribe(
              (data: any) => this.videoName = data.items[0].snippet.title
          );
        });
    }

    recentVideoList(params: any) {
      let tmpList = [params.videoId];
      //dentro a lastWatched mettiamo le stringhe parsate in JSON degli id dei video visti
      let lastWatched = JSON.parse(localStorage.getItem('lastWatched'));
      //se lastWatched contiene qualcosa
      if (lastWatched){
      //scorro l'array di lastWatched finchè non arriva a 11 elementi
        for (let i = 0; i<lastWatched.length && i<11; i++){
        // se il video corrente non è presente in lastWatched, non lo metto perchè l'ho già
        //messo nella prima riga
        //e push in tmpList l'array di lastWatched
          if (params.videoId != lastWatched[i]) tmpList.push(lastWatched[i]);
        }
      }
      localStorage.setItem('lastWatched' , JSON.stringify(tmpList));
    }

    @ViewChild('iframe') iframe: ElementRef;
}
