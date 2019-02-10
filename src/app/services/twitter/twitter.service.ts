import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {
  
  private consumer = '';
  private secret= '';
  tep = 'https://api.twitter.com';
  
  constructor(private http: HttpClient) { }
  
  //~ Temporary suspended
  getTweets(artist: string, song: string){
    //~ var postHeaders = new HttpHeaders({
      //~ 'Authorization': 'Basic ' + btoa(encodeURIComponent(this.consumer) + ":" + encodeURIComponent(this.secret)), 
      //~ 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      //~ 'Accept-Encoding': 'gzip',
      //~ 'Content-Length': '29'
    //~ });
    //~ console.log(postHeaders);
    //~ var body = 'grant_type=client_credentials';
    //~ this.http.post(this.tep + '/oauth2/token', body, postHeaders).subscribe(
      //~ (data: any) => {
        //~ console.log(data);
      //~ },
      //~ error => console.log(error)
    //~ );
    //~ console.log(token);
    //~ return this.http.get(this.tep + '/1.1/search/tweets.json', {
      //~ headers: this.headers,
      //~ params: {
        //~ q: artist+" "+song,
        //~ lang: "en",
        //~ result_type: "popular",
        //~ count: "12"
        //~ }
    //~ });
  }
}
