import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { AlphalistService } from '../../../services/alphalist/alphalist.service';

@Component({
  selector: 'app-recommender',
  templateUrl: './recommender.component.html',
  styleUrls: ['./recommender.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RecommenderComponent implements OnInit {
    videos: any;

    constructor(private alphalistService: AlphalistService) { }

    ngOnInit() {
        this.alphalistService.getAll().subscribe(
          (data: any) => { this.videos = data; },
          error => console.log(error)
        );
    }
}
