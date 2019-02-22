import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {
  
  private consumer = 'bGp3ZrcxcqXgKPLHlgjDm0nat';
  private secret= '19aF7C5OucXxIUxn7UPYPWvWazUzvikS6HIJupcuw1XyOEsr26';
  tep = 'https://api.twitter.com';
  
  constructor(private http: HttpClient) { }
  
  //~ Temporary suspended
  getTweets(artist: string, song: string){
    return this.http.get(this.tep + '/1.1/search/tweets.json', {
      params: {
        q: artist+" "+song,
        lang: "en",
        result_type: "popular",
        count: "12"
        }
    });
	}
}
