import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})

export class PlayerComponent implements OnInit {
    url : any ;
    videoID: string = undefined;
    baseUrl: string = 'http://www.youtube.com/embed/';


    constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.route.paramMap.subscribe( params => {
            this.videoID = params.get('videoId')
            this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl + this.videoID);
        });
    }

}
