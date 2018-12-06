import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DbpediaService } from '../../../services/dbpedia/dbpedia.service'

@Component({
  selector: 'app-wikibox',
  templateUrl: './wikibox.component.html',
  styleUrls: ['./wikibox.component.css']
})
export class WikiboxComponent implements OnInit {

  videoId: string;
  wikidata: any;
  
  constructor(private route: ActivatedRoute, private dbs: DbpediaService) { }

  ngOnInit() {
	this.dbs.getSPARQL().subscribe(
      (data: any) => {
		  this.wikidata = data;
		  console.log(this.wikidata); 
		},
      error => console.log(error)
    );
  }

}
