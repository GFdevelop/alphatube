import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';   // TODO: remove this and html
import { AlphalistService } from '../../services/alphalist/alphalist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
//add
  videoId: string;
  videos: any;

  constructor(private alphalistService: AlphalistService) { }

  ngOnInit() {
      this.alphalistService.getAll().subscribe(
        (data: any) => { this.videos = data; },
        error => console.log(error)
      );
  }
}
