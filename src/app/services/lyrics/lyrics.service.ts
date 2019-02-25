import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LyricsService {

  apiRef = 'https://api.musixmatch.com/ws/1.1';
  devKey = 'd13666cbfa0695c12c31616bc57dc7e0';
  
  constructor(private http: HttpClient) {	}
  
  // ~ JSONP is required by MusicXMatch
  getLyrics(artist: string, song: string) {
		return this.http.jsonp(this.apiRef + `
			/matcher.lyrics.get?
			format=jsonp&
			q_track=` + song + `&
			q_artist=` + artist + `&
			apikey=` + this.devKey, 'callback');
	}

}
