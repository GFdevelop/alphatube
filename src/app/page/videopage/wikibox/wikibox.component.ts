import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DbpediaService } from '../../../services/dbpedia/dbpedia.service';
import { YoutubeService } from '../../../services/youtube/youtube.service';
import { LyricsService } from '../../../services/lyrics/lyrics.service';
import { TwitterService } from '../../../services/twitter/twitter.service';

@Component({
  selector: 'app-wikibox',
  templateUrl: './wikibox.component.html',
  styleUrls: ['./wikibox.component.css']
})
export class WikiboxComponent implements OnInit {

  // ~ Vars containing DBpedia pill info
  singer: any;
  singer_abs: any;
  song: any;
  song_abs: any;
  album: any;
  album_abs: any;
  genres: any;
  
  // ~ Vars containing YouTube pill info
  title: any;
  comments: any;
  description: any;
  statistics: any;
  tags: any;
  
  // ~ Var containing MusicXMatch pill lyrics
  musicLyrics: any;
  
  // ~ Var containing Twitter data
  twitter: any;

  constructor(private route: ActivatedRoute, private dbs: DbpediaService, private yt: YoutubeService, private mxm: LyricsService, private twit: TwitterService) { }

	// ~ On inizialization, vars' values are resetted because old values may lead to error.
	// ~ A new call to YouTube for retrieve info is made.
  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
				this.musicLyrics = this.title = this.song = this.singer_abs = this.song_abs = this.genres = this.comments = null;
				this.fetchYTData(params.videoId);
			});
  }

  //~ YouTube info code
  //~ TODO: Continuos scroll for comments
  fetchYTData(videoId: string){
		
		// ~ Comments
    this.yt.getComments(videoId).subscribe(
      (data: any) => {
				if(data.items.lenght == 0) this.comments = 0; // ~ This value is then used in <*ngIf> directive
        else this.comments = data.items;
      },
      error => console.log(error)
    );

    // ~ Description/info
    this.yt.getVideo(videoId).subscribe(
      (data: any) => {
				this.description = data.items[0].snippet.description;
        this.statistics = data.items[0].statistics;
        this.tags = data.items[0].snippet.tags;
        
        //~ TODO: Check which is what. The schema is "singer - song" or "song - singer"
        //~ FIXED: The schema is assumed to be BAND - SONG or BAND -SONG or BAND- SONG or BAND-SONG
        this.title = data.items[0].snippet.title;
        try {
					this.singer = this.title.split(' - ')[0].replace(/\{(.*?)\}|\[(.*?)\]|\((.*?)\)/g, "").trim();
					this.song = this.title.split(' - ')[1].replace(/\{(.*?)\}|\[(.*?)\]|\((.*?)\)/g, "").trim();
				} catch(error) {
					window.alert("Schema not recognized, some info may be not available!");
				} finally {
					this.fetchMusicXMatch(this.singer, this.song);
				}

				// ~ Once the singer and song values ​​have been determined, search for others wikibox section is launched 
        this.fetchDBpedia(this.singer, this.song);
        this.fetchTwitter(this.singer, this.song);
      },
      error => console.log(error)
    );
  }

	// ~ DBpedia info code
	fetchDBpedia(singer: string, song: string){

		// ~ Singer
		this.dbs.getSingerInfo(this.singer).subscribe(
			(data: any) => {
				this.singer_abs = data.results.bindings[0];
				
				// ~ Search for genre desription is made if and only if DBpedia has returned soma value for the genre field
				// ~ Some artist have no genre specified in his DBpedia page (e.g. http://dbpedia.org/page/Eminem)
				if(data.results.bindings[0] != undefined) {
					this.dbs.getGenreInfo(data.results.bindings[0].genres.value).subscribe(
						(data: any) => this.genres = data.results.bindings,
						error => console.log(error)
					);
				}
				
			},
			error => console.log(error)
		);

		//~ Song
		this.dbs.getSongInfo(this.song, this.singer).subscribe(
			(data: any) => {
				this.song_abs = data.results.bindings[0];
				if(data.results.bindings[0] != undefined) {
					this.dbs.getAlbumInfo(data.results.bindings[0].album.value).subscribe(
						(data: any) => {
							this.album_abs = data.results.bindings[0].abstract.value;
							this.album = data.results.bindings[0].name.value;
						},
						error => console.log(error)
					);
				}
			},
			error => console.log(error)
		);
	}

	//~ Musicxmatch lyrics code
	//~ TODO: replace space with '-' before attach MusicXMatch full lyrics link
	fetchMusicXMatch(singer: string, song: string){
		this.mxm.getLyrics(singer, song).subscribe(
			(data: any) => {
				if (data.message.header.status_code == 200) this.musicLyrics = data;
			},
			error => console.log(error)
		);
	}
	
	//~ Twitter data code
	fetchTwitter(singer: string, song: string){
		this.twit.getTweets(singer, song).subscribe(
			(data: any) => this.twitter = data.statuses,
			error => console.log(error)
		);
	}
}
