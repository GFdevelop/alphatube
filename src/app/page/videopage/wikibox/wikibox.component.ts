import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DbpediaService } from '../../../services/dbpedia/dbpedia.service';
import { YoutubeService } from '../../../services/youtube/youtube.service';

@Component({
  selector: 'app-wikibox',
  templateUrl: './wikibox.component.html',
  styleUrls: ['./wikibox.component.css']
})
export class WikiboxComponent implements OnInit {

  wikidata: any;
  comments: any;
  description: any;
  statistics: any;
  tags: any;
  title: any;

  constructor(private route: ActivatedRoute, private dbs: DbpediaService, private yt: YoutubeService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.fetchYTData(params.videoId);
		console.log(this.description);
    });
  }
  
  fetchYTData(videoId: string){
	// ~ Comments
    this.yt.getComments(videoId).subscribe(
      (data: any) => {
        this.comments = data.items;
      },
      error => console.log(error)
     );
     
     // ~ Description/info
     this.yt.getVideo(videoId).subscribe(
       (data: any) => {
         this.description = data.items[0].snippet.description;
         console.log(this.description);
         this.statistics = data.items[0].statistics;
         this.tags = data.items[0].snippet.tags;
         this.title = data.items[0].snippet.title;
       },
       error => console.log(error)
     );
   }
   
   fetchDBpedia(title: string){
	   // ~ DBpedia pill
        this.dbs.getSPARQL().subscribe(
          (data: any) => {
             this.wikidata = data;
             // ~ console.log(this.wikidata);
          },
          error => console.log(error)
        );
   }
}
