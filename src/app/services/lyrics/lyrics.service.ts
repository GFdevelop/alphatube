import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LyricsService {

	apiRef = 'https://api.musixmatch.com/ws/1.1';
  devKey = 'd13666cbfa0695c12c31616bc57dc7e0';
  
  constructor(private http: HttpClient) {	}
  
  getLyrics(artist: string, song: string) {
		return this.http.get('https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&q_track=sexy%20and%20i%20know%20it&q_artist=lmfao&apikey=d13666cbfa0695c12c31616bc57dc7e0');
	}
	
}
