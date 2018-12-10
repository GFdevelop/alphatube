import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';   // TODO: remove this and html

@Component({
  selector: 'app-videopage',
  templateUrl: './videopage.component.html',
  styleUrls: ['./videopage.component.css']
})
export class VideopageComponent implements OnInit {

  videoId: string;

  constructor(private route: ActivatedRoute) { }   // TODO: remove this and html

  ngOnInit() {
    this.route.params.subscribe((params) => this.videoId = params.videoId);   // TODO: remove this and html
  }

}
