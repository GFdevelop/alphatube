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
            this.iframe.nativeElement.contentWindow.location.replace(this.baseUrl + params.videoId);
            this.videoInfo.getVideo(params.videoId).subscribe(
                (data: any) => this.videoName = data.items[0].snippet.title
            );
        });
    }
    @ViewChild("iframe") iframe: ElementRef;

}
