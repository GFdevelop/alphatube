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

  singer_abs: any;
  song_abs: any;
  genre_abs: any;
  album_abs: any;
  comments: any;
  description: any;
  statistics: any;
  tags: any;
  
  title: any;
  singer: any;
  song: any;
  album: any;
  genres: any;

  constructor(private route: ActivatedRoute, private dbs: DbpediaService, private yt: YoutubeService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
				this.title = this.song = this.singer_abs = this.song_abs = this.genre_abs = this.comments = null;
        this.fetchYTData(params.videoId);
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
         this.statistics = data.items[0].statistics;
         this.tags = data.items[0].snippet.tags;
         this.title = data.items[0].snippet.title;
         
         //~ TODO: Check which is what. The schema is "singer - song" or "song - singer"
         //~ FIXED: The schema is assumed to be BAND NAME/SINGER NAME - SONG TITLE
         this.singer = this.title.split(" - ")[0].replace(/\{(.*?)\}|\[(.*?)\]|\((.*?)\)/g, "").trim();
         this.song = this.title.split(" - ")[1].replace(/\{(.*?)\}|\[(.*?)\]|\((.*?)\)/g, "").trim();
         
         this.fetchDBpedia(this.singer, this.song);
       },
       error => console.log(error)
     );
   }
   
  // ~ DBpedia pill
	fetchDBpedia(singer: string, song: string){
			
		//~ Singer
		this.dbs.getSingerInfo(this.singer).subscribe(
			(data: any) => {
				this.singer_abs = data.results.bindings[0].abstract.value;
				//~ TODO: Should be global replacement
				this.genres = data.results.bindings[0].genres.value.replace("http://dbpedia.org/resource/", "").replace("_", " ").split("#");
				//~ Genre
				this.dbs.getGenreInfo(this.genres).subscribe(
					(data: any) => {
						this.genre_abs = data.results.bindings[0].abstract.value;
					},
					error => console.log(error)
				);
			},
			error => console.log(error)
		);
     
		//~ Song
		this.dbs.getSongInfo(this.song, this.singer).subscribe(
			(data: any) => {
				this.song_abs = data.results.bindings[0].abstract.value;
				this.dbs.getAlbumInfo(data.results.bindings[0].album.value).subscribe(
					(data: any) => {
						//~ console.log(this.album);
						this.album_abs = data.results.bindings[0].abstract.value;
						this.album = data.results.bindings[0].name.value;
						console.log(data);
					},
					error => console.log(error)
					//~ console.log(data);
				);
			},
			error => console.log(error)
		);
	}
}
