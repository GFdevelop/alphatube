import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {
  
  constructor(private http: HttpClient) { }
  
  getTweets(artist: string, song: string){
    return this.http.get(window.location.origin + '/twitter', {
      params: {
        q_artist: artist,
        q_song: song
       }
    });
	}

}
