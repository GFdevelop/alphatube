import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DbpediaService } from '../../../services/dbpedia/dbpedia.service'
import { SearchService } from '../../../services/search/search.service'

@Component({
  selector: 'app-wikibox',
  templateUrl: './wikibox.component.html',
  styleUrls: ['./wikibox.component.css']
})
export class WikiboxComponent implements OnInit {

  videoId: string; 
  wikidata: any;
  comments: any;
  description: any;
  tags: any;
 
  constructor(private route: ActivatedRoute, private dbs: DbpediaService, private yt: SearchService) { }

  ngOnInit() {
	this.route.params.pipe(
		(params) => {
			this.videoId = params._value.videoId;
			//~ console.log(this.videoId);
		});
			
	//~ Populate YouTube tabs
	this.yt.getComments(this.videoId).subscribe(
	  (data: any) => {
		  this.comments = data.items;
		  //~ console.log(this.comments);
	    },
      error => console.log(error)
    );
    
    this.yt.getDescription(this.videoId).subscribe(
	  (data: any) => {
		  this.description = data;
		  this.tags = data.items[0].snippet.tags;
		  //~ console.log(this.tags);
		},
      error => console.log(error)
    );
    
	//~ Populate DBpedia tabs
	this.dbs.getSPARQL().subscribe(
      (data: any) => {
			this.wikidata = data;
			//~ console.log(this.wikidata);
		},
      error => console.log(error)
    );
  }
}
