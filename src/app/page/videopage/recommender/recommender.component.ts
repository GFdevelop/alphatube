import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { FvitaliService } from '../../../services/fvitali/fvitali.service';
import { Video } from '../../../services/fvitali/video';

@Component({
  selector: 'app-recommender',
  templateUrl: './recommender.component.html',
  styleUrls: ['./recommender.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RecommenderComponent implements OnInit {
    videos: Array<Video>;

    constructor(private fvitaliService: FvitaliService) { }

    ngOnInit() {
        this.fvitaliService.getAll().subscribe(
          (data: any) => { this.videos = data; },
          error => console.log(error)
        );
    }
}
