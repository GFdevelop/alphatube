import { Component, OnInit } from '@angular/core';
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
    videoUrl: any;

    constructor(
        private sanitizer: DomSanitizer,
        private route: ActivatedRoute,
        private videoInfo: YoutubeService
    ) {}

    ngOnInit() {
        this.route.params.subscribe( params => {

            this.videoInfo.getVideo(params.videoId).subscribe(
                (data: any) => this.videoName = data.items[0].snippet.title
            );
            //problema con la riassegnazzione di videoUrl
            
            this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + params.videoId);
        });
    }
}
